import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() registerData) {
    console.log('Register data:', registerData);
  }

  @Post('/login')
  login() {
    return 'login';
  }
}
