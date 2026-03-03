import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register(registerDto: RegisterDto) {
    const createUserDto = registerDto;

    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }
}
