import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { LoginDto } from './dto/login/login.dto';
import { error } from 'console';

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
    const user = await this.authService.login(loginDto);

    console.log('Користувач:', user);

    return user;
  }
}
