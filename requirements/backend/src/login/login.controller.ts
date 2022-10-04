import { Controller, Post, Get, Headers, Res, Req } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
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
      qr: false,
    };
    res.header({
      token: this.loginService.issueToken(payload),
    });
    return res.redirect('http://localhost:4242/qr', 301);
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
  validateQrCode(@Headers() header, @Res() res: Response) {
    // 뭔가 더 하나?

    const payload: TokenPayloadDto = {
      id: this.loginService.getIdInJwt(header.token),
      qr: true,
    };

    res.header({
      token: this.loginService.issueToken(payload),
    });
    return res.redirect('http://localhost:4242/lobby', 301);
  }
}
