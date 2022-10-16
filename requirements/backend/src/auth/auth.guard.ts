import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, // private dbService: DatabaseService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  validateRequest(request: Request) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];
    const payload = this.authService.verify(jwtString);
    (request as any).jwtPayload = payload;
    return true;
  }
}
