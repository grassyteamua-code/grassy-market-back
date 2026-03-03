import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password || typeof createUserDto.password !== 'string') {
      throw new BadRequestException('Password is required and must be a string');
    }

    const hashedPassword = this.hashPassword(createUserDto.password);

    const { repeatPassword, ...userDataWithoutRepeat } = createUserDto;

    const userData = { ...userDataWithoutRepeat, password: hashedPassword };

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

      const { password: _, ...userWithoutPassword } = foundedUser;

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

      const { password: _, ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(
        'Користувач був знайдений за електронною поштою.',
      );
    }
  }

  async findByPhone(phone: string) {
    try {
      const foundedUser = await this.prismaService.user.findUnique({
        where: { phone },
      });

      if (!foundedUser) {
        return null;
      }

      const { password: _, ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      throw new NotFoundException('Користувач був знайдений за номером телефону.');
    }
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
