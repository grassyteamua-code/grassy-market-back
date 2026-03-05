import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { Public } from '../auth/guards/jwt-auth.guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('find-one/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Public()
  @Get('find-by-username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    const user: User = await this.userService.findByUsername(username);

    delete (user as Record<string, unknown>).password;

    return user;
  }

  @Get('find-by-email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    const user: User = await this.userService.findByEmail(email);

    delete (user as Record<string, unknown>).email;

    return user;
  }

  @Get('find-by-email/:email')
  async findByPhone(@Param('email') phone: string) {
    const user: User = await this.userService.findByPhone(phone);

    delete (user as Record<string, unknown>).phone;

    return user;
  }

  @Patch('updaete/:id')
  update(@Param('id') id: string) {
    return this.userService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
