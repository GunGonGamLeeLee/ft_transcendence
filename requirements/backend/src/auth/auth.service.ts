import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JwtPayloadDto } from 'src/login/jwt.payload.dto';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { isString } from 'class-validator';

dotenv.config({
  path: '/backend.env',
});

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  verify(jwtString: string) {
    try {
      const payload: JwtPayloadDto = jwt.verify(jwtString, jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        JwtPayloadDto;
      return payload;
    } catch (e) {
      console.log('auth.service: throw');
      throw new UnauthorizedException();
    }
  }

  validateRequest(request: Request): boolean {
    const token = request.headers.authorization;
    if (token === undefined || token === null) {
      console.log(`auth.guard: invalid user`);
      return false;
    }
    const jwtString = token.split('Bearer ')[1];
    const payload = this.verify(jwtString);
    (request as any).jwtPayload = payload;
    return true;
  }

  validateSocket(client: Socket): boolean {
    const token = this.getToken(client);
    if (token === undefined || token === null) {
      console.log(`auth.guard: invalid user`);
      return false;
    }
    this.verify(token as string);
    return true;
  }

  private getToken(client: Socket) {
    // FIXME 주석 정리 필요!
    ////////////// postman과 같이 사용할 때 필요한 부분 //////////////
    let token = client.handshake.headers.token;
    if (token === undefined) token = client.handshake.auth.token;
    if (!isString(token)) token = token[0];
    //////////////////////////////////////////////////////////////////
    // const { token } = client.handshake.auth; // 실제 사용
    return token;
  }
}
