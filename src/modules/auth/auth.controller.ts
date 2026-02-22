import { Body, Controller, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/RegisterDto';
import { AuthResponseDto } from './dto/AuthResponseDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }
}
