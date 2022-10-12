import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from '@otplib/preset-default';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as qrcode from 'qrcode';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadDto } from './token.payload.dto';
import { UserInfo } from './login.controller';
import { UserEntity } from 'src/database/entity/entity.user';
import { DatabaseService } from 'src/database/database.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { UserDto } from 'src/database/dto/user.dto';

dotenv.config({
  path: '/backend.env',
});

export const redirectUri = process.env.API_URI;
export const apiUid = process.env.API_UID;
const apiSecret = process.env.API_SECRET;
const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class LoginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly databaseService: DatabaseService,
  ) {}

  async getIntraInfo(code: string): Promise<number> {
    const getTokenUrl = 'https://api.intra.42.fr/oauth/token';
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('client_id', apiUid);
    params.set('client_secret', apiSecret);
    params.set('code', code);
    params.set('redirect_uri', redirectUri);

    const response = await lastValueFrom(
      this.httpService.post(getTokenUrl, params),
    );

    const getUserUrl = 'https://api.intra.42.fr/v2/me';

    const userInfo = await lastValueFrom(
      this.httpService.get(getUserUrl, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      }),
    );

    const imgUri: string = userInfo.data.image.versions.small;
    const imgData = await lastValueFrom(
      this.httpService.get(imgUri, { responseEncoding: 'base64' }),
    );

    fs.mkdirSync('public/img/', { recursive: true });
    fs.writeFileSync(
      `public/img/${userInfo.data.id}.png`,
      Buffer.from(imgData.data, 'base64'),
    );

    return userInfo.data.id;
  }

  issueToken(payload: TokenPayloadDto) {
    return jwt.sign(payload, jwtSecret);
  }

  validateQrCode() {
    const payload = {
      qr: true,
    };
    return jwt.sign(payload, jwtSecret);
  }

  getIdInJwt(token: string): number {
    const payload: any = jwt.decode(token); // FIXME 나중에 고침 - type
    return payload.id;
  }

  private async toDataUrl(otpauth: any) {
    return await new Promise((resolve, reject) => {
      qrcode.toDataURL(otpauth, (err, imageUrl) => {
        if (err) reject(err);
        resolve(imageUrl);
      });
    });
  }

  async createQrCode(uid: number) {
    const { secret } = await this.getUserInfo(uid);
    const otpauth = authenticator.keyuri(
      uid.toString(),
      'transcendence',
      secret,
    );

    const res = this.toDataUrl(otpauth);
    return res;
  }

  async getUserInfo(uid: number): Promise<UserInfo> {
    let user: UserEntity | UserDto = await this.databaseService.findOneUser(
      uid,
    );
    if (user == null) {
      const newUser: UserDto = {
        uid: uid,
        displayName: Math.random().toString(36).substring(2, 11),
        imgUri: `http://localhost:4243/img/${uid}.png`,
        rating: 42,
        mfaNeed: false,
        qrSecret: authenticator.generateSecret(),
      };
      this.databaseService.saveOneUser(newUser);
      user = newUser;
    }

    return {
      id: uid,
      secret: user.qrSecret,
      mfaNeed: user.mfaNeed,
    };
  }

  async validateOtp(jwtString: string, pin: string) {
    const userId = this.getIdInJwt(jwtString);
    const userInfo = await this.getUserInfo(userId);
    const secret = userInfo.secret;
    const token = authenticator.generate(secret);

    if (token !== pin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const payload: TokenPayloadDto = {
      id: userId,
      isRequiredTFA: false,
    };

    return { token: this.issueToken(payload) };
  }
}
