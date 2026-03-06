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
import { Cookies } from 'src/decorators/cookies.decorator';
import { ICookieOptions } from './interfaces/cookie-options.interface';

const REFRESH_TOKEN = 'refreshToken';

@Public()
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}

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

    this.setRefreshTokenCookies(await refreshToken, response);
  }

  @Get('verify-reset-token/:token')
  async verifyReseToken() {
    return await null;
  }
}
