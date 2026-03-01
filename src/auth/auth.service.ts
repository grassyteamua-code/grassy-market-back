import {ConflictException, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  registerUser(createUserDto: CreateUserDto) {
    const user = this.userService.findByEmail(createUserDto.email);

    if (!user) {
      return this.userService.create(createUserDto);
    } else {
      throw new ConflictException(
          'Користувач уже присутній у системі.'
      );
    }
  }
}
