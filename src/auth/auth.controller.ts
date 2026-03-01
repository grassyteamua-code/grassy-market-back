import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/natural-person')
  registerNaturalPerson(@Body registerDto: RegisterNaturalPersonDto) {
    console.log('register', registerDto);
    return 'register';
  }

  @Post('login/natural-person')
  loginNaturalPerson() {
    return 'login';
  }
}
