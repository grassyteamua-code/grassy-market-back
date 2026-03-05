import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashSync, genSaltSync } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.password || typeof createUserDto.password !== 'string') {
      throw new BadRequestException(
        "Пароль є обов'язковим і повинен вводитися як строка.",
      );
    }

    const hashedPassword = this.hashPassword(createUserDto.password);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
      passwordRepeat: hashedPassword,
      status: 'active',
      firstName: createUserDto.firstname,
      lastName: createUserDto.lastname,
      middleName: createUserDto.middlename,
    };

    const existingUserByUsername = await this.findByUsername(
      createUserDto.username,
    );

    if (existingUserByUsername) {
      const errorMessage = `Користувач з нікнеймом "${createUserDto.username}" вже існує.`;

      this.logger.error(errorMessage);

      throw new BadRequestException(
        `Користувач з таким нікнеймом "${createUserDto.username}" вже існує.`,
      );
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);

    if (existingUserByEmail) {
      const errorMessage = `Користувач з електронною скринькою "${createUserDto.email}" вже існує.`;

      this.logger.error(errorMessage);

      throw new BadRequestException(
        `Користувач з такою електронною скринькою "${createUserDto.email}" вже існує.`,
      );
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((error) => {
        console.log('Помилка при створенні користувача:', error);
        throw new BadRequestException(
          'Виникла помилка під час реєстрації нового користувача',
        );
      });

    delete newUser.password;

    return newUser;
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findById(id: string) {
    return this.prismaService.user
      .findUnique({
        where: { id },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((error) => {
        this.logger.error(
          `Помилка при пошуку користувача за його ID: ${id}`,
          error,
        );
        throw new NotFoundException('Користувач');
      });
  }

  async findByUsername(username: string) {
    try {
      const foundedUser = await this.prismaService.user.findFirst({
        where: { username },
      });

      if (!foundedUser) {
        return null;
      }

      const { ...userWithoutPassword } = foundedUser;

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

      const { ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(
        'Користувач був знайдений за електронною поштою.',
      );
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

      const { ...userWithoutPassword } = foundedUser;

      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(
        'Користувач був знайдений за електронною поштою.',
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.user
      .delete({
        where: { id },
      })
      .then((deletedUser) => {
        return { message: 'Користувач успішно видалений', user: deletedUser };
      })
      .catch((error) => {
        this.logger.error('Користувач не знайдений для видалення.', error);
        throw new Error(`Користувач не знайдений для видалення: ${error}`);
      });
  }

  private hashPassword(password: string): string {
    return hashSync(password, genSaltSync(10));
  }
}
