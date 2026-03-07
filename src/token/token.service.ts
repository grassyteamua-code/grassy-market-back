import { Token } from '@prisma/client';
import type { ManipulateType } from 'dayjs';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { ITokens } from '../auth/interfaces/token.interface';
import { Response } from 'express';
import { getCookieOptions } from '../utils/cookie-options.util';

@Injectable()
export class TokenService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async refreshTokens(refreshToken: string): Promise<ITokens> {
    const deletedToken: Token | null = await this.prismaService.token
      .delete({
        where: { token: refreshToken },
      })
      .catch(() => null);

    if (!deletedToken) {
      throw new UnauthorizedException();
    }

    const today = dayjs();
    const expDate = dayjs(deletedToken.expiresAt);
    const isExpired = expDate.isBefore(today);

    if (!deletedToken.expiresAt || isExpired) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findById(deletedToken.userId);

    return this.generateTokens(user);
  }

  generateTokens = async (user: User): Promise<ITokens> => {
    const accessToken = this.jwtService.sign({
      userId: user.id,
      userName: user.userName,
      email: user.email,
      role: user.role,
    });

    const refreshToken: Token = await this.getRefreshToken(user.id);
    const tokens = { accessToken, refreshToken };

    return tokens;
  };

  private getRefreshToken = async (userId: string): Promise<Token> => {
    const currentDate = dayjs();

    const expirationUnit = this.configService.get<string>('TOKEN_EXPIRATION_UNIT');
    const expirationValue = this.configService.get<number>('TOKEN_EXPIRATION_VALUE');

    const expireDate = currentDate
      .add(expirationValue ?? 7, (expirationUnit ?? 'day') as ManipulateType)
      .toDate();

    return await this.prismaService.token.create({
      data: {
        token: v4(),
        expiresAt: expireDate,
        userId,
      },
    });
  };

  setRefreshTokenToCookies(tokens: ITokens, res: Response) {
    if (!tokens) {
      throw new UnauthorizedException();
    }

    const { token, expiresAt } = tokens.refreshToken;
    const cookieExpDate = dayjs(expiresAt).toDate();

    const refreshToken = this.configService.get<string>('REFRESH_TOKEN');

    res.cookie(refreshToken, token, getCookieOptions(cookieExpDate));
    res.status(HttpStatus.CREATED).json({ accessToken: tokens.accessToken });
  }
}
