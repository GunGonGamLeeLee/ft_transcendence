import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { TokenPayloadDto } from 'src/login/token.payload.dto';

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
      const payload: TokenPayloadDto = jwt.verify(jwtString, jwtSecret) as (
        | jwt.JwtPayload
        | string
      ) &
        TokenPayloadDto;
      return payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
