import {
  Controller,
  Post,
  Get,
  Headers,
  Res,
  Query,
  Redirect,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';
import { authenticator } from '@otplib/preset-default';
import { Response } from 'express';
import { apiUid, LoginService, redirectUri } from './login.service';
import { TokenPayloadDto } from './token.payload.dto';

export interface UserInfo {
  id: number;
  secret: string;
  isRequiredTFA: boolean;
}

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('login')
  @Get('oauth')
  @Redirect(
    `https://api.intra.42.fr/oauth/authorize?client_id=${apiUid}&redirect_uri=${redirectUri}&response_type=code`,
    301,
  )
  loginOauth() {
    return;
  }

  @ApiTags('login')
  @ApiQuery({
    name: 'code',
    required: true,
    description: '42 login 후 전달 받은 code',
  })
  @Get('oauth/callback')
  async codeCallback(@Res() res: Response, @Query('code') query) {
    const userId = await this.loginService.getIntraInfo(query);
    console.log(`userid: ${userId}`); // ANCHOR print

    const userInfo = await this.loginService.getUserInfo(userId);
    const payload: TokenPayloadDto = {
      id: userInfo.id,
      isRequiredTFA: userInfo.isRequiredTFA,
    };
    res.cookie('token', this.loginService.issueToken(payload));

    if (payload.isRequiredTFA)
      return res.redirect(301, 'http://localhost:4242/login'); // qr code (x) -> opt input;
    return res.redirect(301, 'http://localhost:4242/lobby');
  }

  @ApiTags('login')
  @ApiHeader({ name: 'token' })
  @Get('qr')
  sendQrCode(@Headers() header) {
    const id = this.loginService.getIdInJwt(header.token);
    return this.loginService.createQrCode(id);
  }

  @ApiTags('login')
  @ApiHeader({ name: 'token' })
  @ApiBody({})
  @Post('otp')
  async validateOtp(@Headers() header, @Body() body) {
    console.log(header.token);
    const userId = this.loginService.getIdInJwt(header.token);
    const userInfo = await this.loginService.getUserInfo(userId);
    const secret = userInfo.secret;
    const token = authenticator.generate(secret);

    // ANCHOR 같은 secret으로 연결되었다면 otp 값 일치!
    // console.log(token);
    // console.log(body.code);

    if (token != body.code) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const payload: TokenPayloadDto = {
      id: userId,
      isRequiredTFA: false,
    };

    const json = { token: this.loginService.issueToken(payload) };
    return json;
  }
}
