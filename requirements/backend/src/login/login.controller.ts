import { Controller, Post, Get, Headers, Res, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { authenticator } from '@otplib/preset-default';
import { Response } from 'express';
import { LoginService } from './login.service';
import { TokenPayloadDto } from './token.payload.dto';

export interface UserInfo {
  id: number;
  secret: string;
}

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('login')
  @Get('oauth')
  loginOauth(@Res() res: Response) {
    const userInfo = this.loginService.loginOauth();
    const payload: TokenPayloadDto = {
      id: userInfo.id,
      qr: false, // FIXME !userInfo.twoStep;
    };
    res.header({
      token: this.loginService.issueToken(payload),
    });
    if (payload.qr == false)
      return res.redirect('http://localhost:4242/qr', 301); // qr code (x) -> opt input;
    return res.redirect('http://localhost:4242/lobby', 301);
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
  validateOtp(@Body() body, @Headers() header, @Res() res: Response) {
    const userId = this.loginService.getIdInJwt(header.token);
    const userInfo = this.loginService.getUserInfo(userId);
    const secret = userInfo.secret;
    const token = authenticator.generate(secret);
    // console.log(token);
    // console.log(body.code);

    if (token != body.code) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const payload: TokenPayloadDto = {
      id: userId,
      qr: true,
    };

    res.header({
      token: this.loginService.issueToken(payload),
    });
    return res.redirect('http://localhost:4242/lobby', 301);
  }
}
