import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadDto } from './token.payload.dto';
import { authenticator } from '@otplib/preset-default';
import * as qrcode from 'qrcode';
import { resolve } from 'path';
import { rejects } from 'assert';
import { UserInfo } from './login.controller';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LoginService {
  constructor(private readonly httpService: HttpService) {}

  async getIntraInfo(code: string) {
    // FIXME fixed environment variables
    const redirect_uri = 'http://localhost:4243/login/oauth/callback';
        
    // FIXME user env
    const apiUid = ' ';
    const apiSecret = ' ';

    const getTokenUrl = 'https://api.intra.42.fr/oauth/token';
    const params = new URLSearchParams();
    params.set('grant_type', 'authorization_code');
    params.set('client_id', apiUid);
    params.set('client_secret', apiSecret);
    params.set('code', code);
    params.set('redirect_uri', redirect_uri);
    
    const response = await lastValueFrom(this.httpService.post(getTokenUrl, params));

    const getUserUrl: string = 'https://api.intra.42.fr/v2/me';

    const userInfo = await lastValueFrom(this.httpService.get(getUserUrl, {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`
      }
    }));

    return userInfo.data.id;
  }

  issueToken(payload: TokenPayloadDto) {
    return jwt.sign(payload, '나중에 고침');
  }

  validateQrCode() {
    const payload = {
      qr: true,
    };
    return jwt.sign(payload, '나중에 고침');
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

  createQrCode(id: number) {
    const userSecret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(
      id.toString(),
      'transcendence',
      userSecret,
    );

    const res = this.toDataUrl(otpauth);
    return res;
  }

  // FIXME DB 조회
  getUserInfo(id: number): UserInfo {
    return {
      id,
      secret: 'asdf',
    };
  }
}
