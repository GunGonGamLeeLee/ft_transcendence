import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV === 'dev' ? '/dev.backend.env' : '/prod.backend.env',
});

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    // FIXME to delete
    console.log(process.env.FRONTEND);
    console.log(process.env.BACKEND);
    console.log(process.env.API_URI);
    console.log(process.env.API_UID);
    console.log(process.env.API_SECRET);
    // console.log(process.env.);
    return this.appService.getHello();
  }
}
