import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { authenticator } from '@otplib/preset-default';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as qrcode from 'qrcode';
import * as jwt from 'jsonwebtoken';
import { JwtPayloadDto } from './jwt.payload.dto';
import { UserEntity } from 'src/database/entity/entity.user';
import { DatabaseService } from 'src/database/database.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { UserDto } from 'src/database/dto/user.dto';
import { IntraInfoDto } from './intra.info.dto';

dotenv.config({
  path: '/backend.env',
});

export const redirectUri = process.env.API_URI;
export const apiUid = process.env.API_UID;
const apiSecret = process.env.API_SECRET;
const jwtSecret = process.env.JWT_SECRET;
const intraApiTokenUri = 'https://api.intra.42.fr/oauth/token'; // TODO env로
const intraApiMyInfoUri = 'https://api.intra.42.fr/v2/me';

@Injectable()
export class LoginService {
  constructor(
    private readonly httpService: HttpService,
    private readonly database: DatabaseService,
  ) {}

  async getIntraInfo(code: string): Promise<IntraInfoDto> {
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('client_id', apiUid);
    params.set('client_secret', apiSecret);
    params.set('code', code);
    params.set('redirect_uri', redirectUri);

    const tokens = await lastValueFrom(
      this.httpService.post(intraApiTokenUri, params),
    );
    const userInfo = await lastValueFrom(
      this.httpService.get(intraApiMyInfoUri, {
        headers: {
          Authorization: `Bearer ${tokens.data.access_token}`,
        },
      }),
    );

    return {
      uid: userInfo.data.id,
      imgUri: userInfo.data.image.versions.small,
    };
  }

  async downloadProfileImg(intraInfo: IntraInfoDto) {
    const { uid, imgUri } = intraInfo;
    const imgData = await lastValueFrom(
      this.httpService.get(imgUri, { responseEncoding: 'base64' }),
    );

    fs.mkdirSync('public/img/', { recursive: true });
    fs.writeFileSync(
      `public/img/${uid}.png`,
      Buffer.from(imgData.data, 'base64'),
    );
  }

  issueToken(payload: JwtPayloadDto) {
    return jwt.sign(payload, jwtSecret);
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
    const { qrSecret } = await this.database.findOneUser(uid);
    const otpauth = authenticator.keyuri(
      uid.toString(),
      'transcendence',
      qrSecret,
    );
    return this.toDataUrl(otpauth);
  }

  async getTokenInfo(intraInfo: IntraInfoDto): Promise<JwtPayloadDto> {
    const { uid } = intraInfo;
    let user: UserEntity | UserDto = await this.database.findOneUser(uid);
    if (user == null) {
      const newUser: UserDto = {
        uid,
        displayName: Math.random().toString(36).substring(2, 11),
        imgUri: `http://localhost:4243/img/${uid}.png`,
        rating: 42,
        mfaNeed: false,
        qrSecret: authenticator.generateSecret(),
      };
      this.database.addUser(newUser);
      await this.downloadProfileImg(intraInfo);
      user = newUser;
    }

    return {
      id: uid,
      isRequiredTFA: user.mfaNeed,
    };
  }

  async validateOtp(payload: JwtPayloadDto, pin: string) {
    const user = await this.database.findOneUser(payload.id);

    if (pin !== authenticator.generate(user.qrSecret)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    payload.isRequiredTFA = false;
    return { token: this.issueToken(payload) };
  }
}
