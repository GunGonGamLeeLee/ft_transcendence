import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request body:', req.body);
    console.log('Request body.chid type:', typeof req.body.chid);
    console.log('Request body.password type:', typeof req.body.password);
    next();
  }
}
