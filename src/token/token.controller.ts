import { Controller, Get, Res, UnauthorizedException } from '@nestjs/common';
import type { Response } from 'express';
import { TokenService } from './token.service';
import { Public } from '@auth/guards/jwt-auth.guards';
import { Cookies } from '@decorators/cookie.decoration';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'refreshToken';

@Public()
@Controller('token')
export class TokenController {
  private readonly refreshToken: string;

  constructor(private readonly tokenService: TokenService) {}

  @Get('refresh-tokens')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const tokens = await this.tokenService.refreshTokens(refreshToken);

    if (!tokens) {
      throw new UnauthorizedException();
    }

    this.tokenService.setRefreshTokenToCookies(tokens, response);
  }
}
