import {
  HttpStatus,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { ITokens } from '../auth/interfaces/token.interface';
import { Response } from 'express';
import { getCookieOptions } from '@utils/cookie-options.util';

type TokenRecord = {
  token: string;
  expires: Date;
  userId: string;
};

@Injectable()
export class TokenService {
  private readonly logger = new Logger(TokenService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async refreshTokens(refreshToken: string): Promise<ITokens> {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }

    const tokenRecord = await this.prismaService.token.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      this.logger.warn('Refresh token not found');
      throw new UnauthorizedException('Refresh token not valid');
    }

    const now = dayjs();
    const expiresAt = dayjs(tokenRecord.expires);
    if (!tokenRecord.expires || expiresAt.isBefore(now)) {
      await this.prismaService.token
        .delete({ where: { token: refreshToken } })
        .catch(() => null);
      this.logger.warn('Refresh token expired');
      throw new UnauthorizedException('Refresh token expired');
    }

    // 3) delete token to enforce single-use refresh tokens
    await this.prismaService.token
      .delete({ where: { token: refreshToken } })
      .catch((err) => {
        this.logger.error('Failed to delete refresh token', err);
      });

    // 4) load user
    const user = await this.prismaService.user.findUnique({ where: { id: tokenRecord.userId } });
    if (!user) {
      this.logger.error('User for refresh token not found', tokenRecord.userId);
      throw new UnauthorizedException('User not found');
    }

    // generate new tokens
    return this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<ITokens> {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });

    const refreshTokenRecord = await this.createRefreshToken(user.id);

    return {
      accessToken,
      refreshToken: {
        token: refreshTokenRecord.token,
        expires: refreshTokenRecord.expires,
      },
    } as unknown as ITokens;
  }

  private async createRefreshToken(userId: string): Promise<TokenRecord> {
    const expirationUnit = this.configService.get<string>('TOKEN_EXPIRATION_UNIT') ?? 'day';
    const expirationValue = Number(
      this.configService.get<string>('TOKEN_EXPIRATION_VALUE') ?? 30,
    );

    const expires = dayjs()
      .add(expirationValue, expirationUnit as dayjs.ManipulateType)
      .toDate();

    const tokenValue = uuidv4();

    const created = await this.prismaService.token.create({
      data: {
        token: tokenValue,
        expires,
        userId,
      },
    });

    return {
      token: created.token,
      expires: created.expires,
      userId: created.userId,
    };
  }

  setRefreshTokenToCookies(tokens: ITokens, res: Response) {
    if (!tokens || !tokens.refreshToken) {
      throw new UnauthorizedException('Tokens are required');
    }

    const { token: refreshTokenValue, expires } = tokens.refreshToken;
    const cookieExpDate = dayjs(expires).toDate();

    const refreshTokenName = this.configService.get<string>('REFRESH_TOKEN') ?? 'refreshToken';

    res.cookie(
      refreshTokenName,
      refreshTokenValue,
      getCookieOptions(cookieExpDate),
    );
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
