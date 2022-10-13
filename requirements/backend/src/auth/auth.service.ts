import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { JwtPayloadDto } from 'src/login/jwt.payload.dto';

dotenv.config({
  path: '/backend.env',
});

const jwtSecret = process.env.JWT_SECRET;

@Injectable()
export class AuthService {
  verify(jwtString: string) {
    // console.log(jwtSecret);
    // console.log(jwtString);
    try {
      const payload: JwtPayloadDto = jwt.verify(jwtString, jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        JwtPayloadDto;
      return payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
