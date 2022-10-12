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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { authenticator } from '@otplib/preset-default';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { apiUid, LoginService, redirectUri } from './login.service';
import { optDto } from './otp.dto';
import { TokenPayloadDto } from './token.payload.dto';

export interface UserInfo {
  id: number;
  secret: string;
  mfaNeed: boolean;
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

    const userInfo = await this.loginService.getUserInfo(userId);
    const payload: TokenPayloadDto = {
      id: userInfo.id,
      isRequiredTFA: userInfo.mfaNeed,
    };
    res.cookie('token', this.loginService.issueToken(payload));
    res.header('Cache-Control', 'no-store');

    return res.redirect(301, 'http://localhost:4242/login');
  }

  @ApiTags('login')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('qr')
  sendQrCode(@Headers() header) {
    const jwtString = header.authorization.split('Bearer ')[1];
    const id = this.loginService.getIdInJwt(jwtString);
    return this.loginService.createQrCode(id);
  }

  @ApiTags('login')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post('otp')
  async validateOtp(@Headers() header, @Body() body: optDto) {
    const jwtString = header.authorization.split('Bearer ')[1];
    const userId = this.loginService.getIdInJwt(jwtString);
    const userInfo = await this.loginService.getUserInfo(userId);
    const secret = userInfo.secret;
    const token = authenticator.generate(secret);

    if (token !== body.pin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const payload: TokenPayloadDto = {
      id: userId,
      isRequiredTFA: false,
    };

    const json = { token: this.loginService.issueToken(payload) };
    return json;
  }

  @ApiTags('token')
  @ApiOperation({ summary: '토큰 발급받기 - 디버그용 api입니다.' })
  @ApiHeader({ name: 'uid' })
  @Get('token')
  async getToken(@Headers() header) {
    return this.loginService.issueToken({
      id: header.uid,
      isRequiredTFA: false,
    });
  }
}
