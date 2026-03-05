import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { LoginDto } from './dto/login/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    const createdUser = this.authService.register(registerDto);

    return createdUser;
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log('Login DTO:', loginDto);

    return loginDto;
  }
}
