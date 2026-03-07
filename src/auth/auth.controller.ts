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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from '../auth/dto/register/register.dto';
import { LoginDto } from '../auth/dto/login/login.dto';
import { Public } from '../auth/guards/jwt-auth.guards';
import { Response } from 'express';
import { TokenService } from '../token/token.service';
import { Cookies } from '../decorators/cookie.decoration';
import { ConfigService } from '@nestjs/config';
import { getCookieOptions } from '../utils/cookie-options.util';
import { ITokens } from '../auth/interfaces/token.interface';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

@ApiTags('Auth')
@Public()
@Controller('v1/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Реєстрація користувача у системі агромаркетлейсу "Grassy"',
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description:
      'Користувач був успішно створений у системі агромаркетлейсу "Grassy"',
  })
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = await this.authService.register(registerDto);

    if (!createdUser) {
      const textError =
        'Помилка під час спроби створення нового користувача у системі агромаркетлейсу "Grassy"';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    this.logger.log(
      'Користувач був успішно створений у системі агромаркетлейсу "Grassy"',
    );
    return createdUser;
  }

  @Post('login')
  @ApiOperation({
    summary: 'Вхід користувача у систему агромаркетлейсу "Grassy"',
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description:
      'Користувач успішно увійшов у систему агромаркетлейсу "Grassy"',
  })
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const tokens: ITokens = await this.authService.login(loginDto);

    if (!tokens) {
      const textError =
        'Помилка під час спроби увійти до системи агромаркетлейсу "Grassy"';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    this.tokenService.setRefreshTokenToCookies(tokens, res);

    this.logger.log(
      'Користувач успішно увійшов у систему агромаркетлейсу "Grassy"',
    );

    return res.status(HttpStatus.OK).json({ accessToken: tokens.accessToken });
  }

  @Get('logout')
  @ApiOperation({
    summary: 'Вихід користувача із системи агромаркетлейсу "Grassy"',
  })
  @ApiResponse({
    status: 200,
    description:
      'Користувач успішно вийшов із системи агромаркетлейсу "Grassy"',
  })
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() res: Response,
  ) {
    if (!refreshToken) {
      this.logger.log(
        'Спроба виходу із системи агромаркетлейсу "Grassy" без використання refresh token',
      );

      return res.status(HttpStatus.OK).json({
        message: 'Користувач уже вийшов із системи агромаркетлейсу "Grassy"',
      });
    }

    await this.authService.deleteRefreshToken(refreshToken);

    const refreshTokenName =
      this.configService.get<string>('REFRESH_TOKEN') ?? REFRESH_TOKEN;
    const today = new Date();

    res.cookie(refreshTokenName, '', getCookieOptions(today));

    this.logger.log(
      'Користувач успішно вийшов із системи агромаркетлейсу "Grassy"',
    );
    return res.status(HttpStatus.OK).json({
      message: 'Користувач успішно вийшов із системи агромаркетлейсу "Grassy"',
    });
  }

  @Post('refresh')
  @ApiOperation({
    summary:
      'Оновлення access token користувача системи агромаркетлейсу "Grassy"',
  })
  @ApiResponse({
    status: 200,
    description: 'Access token користувача було успішно оновлено',
  })
  refresh() {
    return { message: 'Access token користувача було успішно оновлено' };
  }

  @Post('forgot-password')
  @ApiOperation({
    summary:
      'Користувач забув пароль від системи агромаркетплейсу "Grassy" та бажає його відновити',
  })
  @ApiBody({
    schema: {
      example: {
        email: 'user@example.com',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description:
      'Посилання для відновлення пароля надіслано на електронну скриньку користувача: user@example.com',
  })
  forgotPassword() {
    return {
      message:
        'Посилання для відновлення пароля надіслано на електронну скриньку користувача: user@example.com',
    };
  }

  @Post('reset-password')
  @ApiOperation({
    summary:
      'Користувач бажає змінити свій пароль від системи агромаркетплейсу "Grassy"',
  })
  @ApiBody({
    schema: {
      example: {
        token: 'reset-token',
        password: 'NewStrongPassword123!',
      },
    },
  })
  resetPassword() {
    return {
      message:
        'Пароль користувача системи агромаркетплейсу "Grassy" було успішно змінено',
    };
  }
}
