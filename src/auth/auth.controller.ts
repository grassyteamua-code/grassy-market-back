import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    const existingUserByUsername: User = this.userService.findByUsername(
      registerDto.username
    );
    console.log("Existing user by username:", existingUserByUsername);
    
    const existingUserByUsername: User = this.userService.findByEmail(
      registerDto.email
    );
    console.log("Existing user by username:", existingUserByEmail);

    return this.authService.register(registerDto);
  }

  @Post('/login')
  login() {
    return 'login';
  }
}
