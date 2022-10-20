import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JwtPayloadDto } from 'src/login/jwt.payload.dto';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { isString } from 'class-validator';

dotenv.config({
  path:
    process.env.NODE_ENV === 'dev' ? '/dev.backend.env' : '/prod.backend.env',
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
    const token = client.handshake.auth.token;
    return token;
  }
}
