import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MyUid = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return (request as any).jwtPayload.id;
  },
);
