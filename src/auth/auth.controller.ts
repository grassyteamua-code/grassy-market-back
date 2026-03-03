import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    const existingUserByUsername: User = this.userService.findByUsername(
      registerDto.username,
    );
    console.log('Existing user by username:', existingUserByUsername);

    if (existingUserByUsername) {
      throw new ConflictException(
        "Користувач з таким ім'ям користувача (нікнеймом) вже існує",
      );
    }

    const existingUserByEmail: User = this.userService.findByEmail(
      registerDto.email,
    );
    console.log('Existing user by email:', existingUserByEmail);

    if (existingUserByEmail) {
      throw new ConflictException(
        "Користувач з таким ім'ям користувача (нікнеймом) вже існує",
      );
    }

    return this.authService.register(registerDto);
  }

  @Post('/login')
  login() {
    return 'login';
  }
}
