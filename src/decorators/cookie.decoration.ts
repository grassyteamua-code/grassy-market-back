import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

type CookiesMap = Record<string, string | undefined>;

export const Cookies = createParamDecorator(
  (
    key: string | undefined,
    ctx: ExecutionContext,
  ): string | CookiesMap | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const cookies = (request.cookies ?? {}) as CookiesMap;

    return key ? cookies?.[key] : cookies;
  },
);
