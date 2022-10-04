import { Controller, Post, Get, Headers, Res, Body, Req } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { authenticator } from '@otplib/preset-default';
import { Response } from 'express';
import { LoginService } from './login.service';
import { TokenPayloadDto } from './token.payload.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('login')
  @Get('oauth')
  loginOauth(@Res() res: Response) {
    const payload: TokenPayloadDto = {
      id: this.loginService.loginOauth(),
      qr: false, // FIXME !this.loginService.getUserInfoTwoStep();
    };
    res.header({
      token: this.loginService.issueToken(payload),
    });
    if (payload.qr == false)
      return res.redirect('http://localhost:4242/qr', 301); // qr code (x) -> opt input;
    return res.redirect('http://localhost:4242/lobby', 301);
  }

  @ApiTags('login')
  @ApiHeader({
    name: 'token',
  })
  @Get('qr')
  sendQrCode(@Headers() header) {
    const id = this.loginService.getIdInJwt(header.token);
    return this.loginService.createQrCode(id);
  }

  @ApiTags('login')
  @ApiHeader({
    name: 'token',
  })
  @Post('qr')
  validateOtp(@Req() req, @Res() res: Response) {
    // 뭔가 더 하나?
    const userId = this.loginService.getIdInJwt(req.header.token);
    const secret = 'asdf'; // FIXME this.loginService.getUserSecret(id);
    const token = authenticator.generate(secret);
    console.log(token);
    console.log(req.body);

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
