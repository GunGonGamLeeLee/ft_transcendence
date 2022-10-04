import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { TokenPayloadDto } from './token.payload.dto';
import { authenticator } from '@otplib/preset-default';
import * as qrcode from 'qrcode';
import { resolve } from 'path';
import { rejects } from 'assert';

@Injectable()
export class LoginService {
  loginOauth() {
    return Math.random();
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
}
