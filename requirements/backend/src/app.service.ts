import { Injectable } from '@nestjs/common';
import 'reflect-metadata';

@Injectable()
export class AppService {
  getHello(): string {
    return 'hello';
  }
}
