import {
  Controller,
  Post,
  Get,
  Headers,
  Res,
  Query,
  Redirect,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtPayload } from 'src/users/decorator/jwt.payload.decorator';
import { MyUid } from 'src/users/decorator/uid.decorator';
import { apiUid, LoginService, redirectUri } from './login.service';
import { optDto } from './otp.dto';

@Controller('login')
@ApiTags('Login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('oauth')
  @Redirect(
    `https://api.intra.42.fr/oauth/authorize?client_id=${apiUid}&redirect_uri=${redirectUri}&response_type=code`,
    301,
  )
  loginOauth() {
    return;
  }

  @ApiQuery({
    name: 'code',
    required: true,
    description: '42 login 후 전달 받은 code',
  })
  @Get('oauth/callback')
  async codeCallback(@Res() res: Response, @Query('code') query) {
    const intraInfo = await this.loginService.getIntraInfo(query);
    const payload = await this.loginService.getTokenInfo(intraInfo);
    res.cookie('token', this.loginService.issueToken(payload));
    res.header('Cache-Control', 'no-store');

    return res.redirect(301, 'http://localhost:4242/login');
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Get('qr')
  sendQrCode(@MyUid() uid) {
    return this.loginService.createQrCode(uid);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  @Post('otp')
  async validateOtp(@JwtPayload() payload, @Body() body: optDto) {
    return this.loginService.validateOtp(payload, body.pin);
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
