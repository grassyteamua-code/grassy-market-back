import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('JWT_REFRESH_SECRET') ??
        'default_refresh_secret_2026',
      passReqToCallback: true,
    };
    super(options);
  }

  async validate(req: Request, payload: { sub: string; email: string }) {
    console.log('RefreshTokenStrategy.validate called', {
      sub: payload.sub,
      email: payload.email,
    });

    const authHeader = req.headers?.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Refresh token not provided.');
    }

    const refreshToken = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Refresh token is empty after extraction.',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        refreshTokens: {
          select: {
            token: true,
            expiresAt: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    const tokens = user.refreshTokens ?? [];
    if (tokens.length === 0) {
      throw new UnauthorizedException('No refresh tokens stored for user.');
    }

    const lastToken = tokens[tokens.length - 1].token;
    const matches = await bcrypt.compare(refreshToken, lastToken);

    if (!matches) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
