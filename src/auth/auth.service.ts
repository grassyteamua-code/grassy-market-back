import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(registerDto: RegisterDto) {
    const hashadPassword = this.hashPassword(registerDto.password);

    const userData = { ...registerDto, password: hashedPassword };

    delete userData.repeatPassword;

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((error) => {
        throw new BadRequestException(
          'Виникла помилка під час реєстрації нового користувача',
        );
      });
    delete newUser.password;

    return newUser;
  };

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
