import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto) {
    const createUser = await this.prismaService.user.create({ data: registerDto });

    if (createUser) {
      throw new BadRequestException(
        'Виникла помилка при реєстрації нового користувача. Будь ласка, спробуйте ще раз.',
      );
    }
  }
}
