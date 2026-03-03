import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
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
  }

  private hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByUsername(username: string) {
    try {
      const foundedUser = await this.prismaService.user.findFirst({
        where: { username },
      });

      if (!foundedUser) {
        return null;
      }

      const { password, ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch {
      throw new NotFoundException('Користувач був знайдений за нікнеймом.');
    }
  }

  async findByEmail(email: string) {
    try {
      const foundedUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!foundedUser) {
        return null;
      }

      const { password, ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Користувач був знайдений за нікнеймом.');
    }
  }

  async findByPhone(email: string) {
    try {
      const foundedUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      if (!foundedUser) {
        return null;
      }

      const { password, ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Користувач був знайдений за нікнеймом.');
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
