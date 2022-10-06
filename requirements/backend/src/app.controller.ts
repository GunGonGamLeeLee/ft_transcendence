import { Controller, Get, Redirect, Response, Next, Header } from '@nestjs/common';
import { Response as Res} from 'express'
import { AppService } from './app.service';

function hello(): string {
  return 'hello';
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
