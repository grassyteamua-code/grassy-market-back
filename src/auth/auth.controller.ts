import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../auth/dto/register/register.dto';
import { LoginDto } from '../auth/dto/login/login.dto';
import { Public } from '../auth/guards/jwt-auth.guards';
import { Response } from 'express';
import { TokenService } from '@token/token.service';
import { Cookies } from '../decorators/cookie.decoration';
import { ConfigService } from '@nestjs/config';
import { getCookieOptions } from '@utils/cookie-options.util';
import { ITokens } from '../auth/interfaces/token.interface';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = await this.authService.register(registerDto);

    if (!createdUser) {
      const textError = 'Ошибка при создании пользователя';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    this.logger.log('Пользователь успешно зарегистрирован');
    return createdUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens: ITokens = await this.authService.login(loginDto);

    if (!tokens) {
      const textError = 'Ошибка при попытке входа';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    this.tokenService.setRefreshTokenToCookies(tokens, res);

    this.logger.log('Пользователь успешно вошел');

    return res.status(HttpStatus.OK).json({ accessToken: tokens.accessToken });
  }

  @Get('logout')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      this.logger.log('Попытка выхода без refresh token');
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Вы уже вышли из системы' });
    }

    await this.authService.deleteRefreshToken(refreshToken);

    const refreshTokenName =
      this.configService.get<string>('REFRESH_TOKEN') ?? REFRESH_TOKEN;
    const today = new Date();

    res.cookie(refreshTokenName, '', getCookieOptions(today));

    this.logger.log('Пользователь успешно вышел');
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Вы успешно вышли из системы' });
  }
}
