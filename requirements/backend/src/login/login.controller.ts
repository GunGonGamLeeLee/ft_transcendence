import { Controller, Post, Get, Headers, Res, Query, Redirect } from '@nestjs/common';
import { ApiBody, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginService } from './login.service';
import { TokenPayloadDto } from './token.payload.dto';

export interface UserInfo {
  id: number;
  secret: string;
}

// FIXME fixed environment variables
const redirectUri = 'http://localhost:4243/login/oauth/callback';
// FIXME user env
const apiUid = ' ';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiTags('login')
  @Get('oauth')
  @Redirect(`https://api.intra.42.fr/oauth/authorize?client_id=${apiUid}&redirect_uri=${redirectUri}&response_type=code`, 301)
  redirectLogin() {
    return ;
  }

  @ApiTags('login')
  @ApiHeader({ name: 'token' })
  @Get('oauth/callback')
  async oauthCallback(@Res() res: Response, @Query('code') query) {
    const userId = await this.loginService.getIntraInfo(query);

    const payload: TokenPayloadDto = {
      id: userId,
      qr: false, // FIXME !userInfo.twoStep;
    };
    console.log(`userid: ${userId}`); //print
    res.cookie('token', this.loginService.issueToken(payload));

    // if (payload.qr == false)
    //   return res.redirect(301, 'http://localhost:4242/login'); // qr code (x) -> opt input;
    // return res.redirect(301, 'http://localhost:4242/login');
    

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
  validateOtp() {
    // const userId = this.loginService.getIdInJwt(header.token);
    // const userInfo = this.loginService.getUserInfo(userId);
    // const secret = userInfo.secret;
    // const token = authenticator.generate(secret);
    // // console.log(token);
    // // console.log(body.code);

    // if (token != body.code) {
    //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // }

    const payload: TokenPayloadDto = {
      id: 12345,
      qr: true,
    };

    const json = { token: this.loginService.issueToken(payload) };
    return json;
  }
  // validateOtp(@Body() body, @Headers() header, @Res() res: Response) {
  //   // const userId = this.loginService.getIdInJwt(header.token);
  //   // const userInfo = this.loginService.getUserInfo(userId);
  //   // const secret = userInfo.secret;
  //   // const token = authenticator.generate(secret);
  //   // // console.log(token);
  //   // // console.log(body.code);

  //   // if (token != body.code) {
  //   //   throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  //   // }

  //   const payload: TokenPayloadDto = {
  //     id: 12345,
  //     qr: true,
  //   };

  //   console.log('return');
  //   return { token: this.loginService.issueToken(payload) };
  // }
}
