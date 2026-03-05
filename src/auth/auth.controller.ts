import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { LoginDto } from './dto/login/login.dto';
import { Public } from './guards/jwt-auth.guards';
import dayjs from 'dayjs';
import type { Response } from 'express';
import { Token } from 'src/token/entities/token.entity';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = await this.authService.register(registerDto);

    if (!createdUser) {
      this.logger.error('Error creating user');
      throw new BadRequestException(
        'Помилка при створенні користувача. Будь ласка, спробуйте ще раз.',
      );
    }

    return createdUser;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const errorMessage =
        'Невірний email або пароль. Будь ласка, спробуйте ще раз.';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }
    console.log('Токени:', tokens);

    const { refreshToken, accessToken } = tokens;

    this.setRefreshTokenCookies(refreshToken, response);

    response.status(HttpStatus.CREATED).json({ accessToken });

    return tokens;
  }

  @Get('refresh-tokens')
  refreshTokens(refreshToken) {
    
  }

  private setRefreshTokenCookies = (
    refreshToken: Token,
    response: Response,
  ) => {
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Помилка при встановленні рефреш токена. Будь ласка, спробуйте ще раз.',
      );
    }

    interface ICookieOptions {
      httpOnly: boolean;
      sameSite: 'lax' | 'strict' | 'none';
      secure: boolean;
      path: string;
      exp: Date;
    }

    const cookieName = 'refreshToken';
    const cookieValue: string = refreshToken.token as string;
    const cookieExpectTime = dayjs().add(7, 'day').toDate();

    const cookieOptions: ICookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      exp: cookieExpectTime,
    };

    response.cookie(cookieName, cookieValue, cookieOptions);
  };
}
