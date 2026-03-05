import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { LoginDto } from './dto/login/login.dto';
import { error } from 'console';
import { Public } from './guards/jwt-auth.guards';
import dayjs from 'dayjs';
import { Response } from 'express';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = await this.authService.register(registerDto);

    if (!createdUser) {
      this.logger.error(error);
      throw new BadRequestException(
        'Помилка при створенні користувача. Будь ласка, спробуйте ще раз.',
      );
    }

    return createdUser;
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const errorMessage =
        'Невірний email або пароль. Будь ласка, спробуйте ще раз.';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }
    console.log('Токени:', tokens);

    return tokens;
  }

  private setRefreshTokenCookies(refreshToken: string, response: Response) {
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Помилка при встановленні рефреш токена. Будь ласка, спробуйте ще раз.',
      );
    }

    const cookieName = 'refreshToken';
    const cookieExpectTime = dayjs().add(7, 'days').toDate();

    const cookieOptions = {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: false,
      expires: cookieExpectTime,
    };

    response.cookie(cookieName, refreshToken, cookieOptions);
  }
}
