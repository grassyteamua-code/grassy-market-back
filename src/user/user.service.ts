import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = this.hashPassword(createUserDto.password);

    const userData = {
      ...createUserDto,
      password: hashedPassword,
      username: createUserDto.userName,
      passwordRepeat: createUserDto.password,
      status: 'ACTIVE',
    };

    const existingUserByUsername = await this.findByUsername(
      createUserDto.userName,
    );
    if (existingUserByUsername) {
      const message =
        'Користувач з таким нікнеймом уже існує в системі. Будь ласка, спробуйте інший нікнейм.';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByEmail = await this.findByEmail(createUserDto.email);
    if (existingUserByEmail) {
      const message =
        'Користувача з такою ж адресою електронної скриньки вже існує в системі. Будь ласка, спробуйте іншу адресу.';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const existingUserByPhone = await this.findByPhone(createUserDto.phone);
    if (existingUserByPhone) {
      const message =
        'Користувача з таким номером мобільного телефону вже існує в системі. Будь ласка, спробуйте інший номер.';
      this.logger.error(message);
      throw new ConflictException(message);
    }

    const newUser = await this.prismaService.user
      .create({
        data: userData,
      })
      .catch((err) => {
        this.logger.error(
          'Сталося помилка під час створення нового користувача в системі. Будь ласка, спробуйте ще раз',
          err,
        );
        throw new BadRequestException(
          'Сталося помилка під час створення нового користувача в системі. Будь ласка, спробуйте ще раз',
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
      .catch((err) => {
        this.logger.error(
          'Сталася помилка під час пошуку користувача за вказаним індитифікатором користувача (ID). Будь ласка, спробуйте ще раз',
          err,
        );
        throw new NotFoundException(
          'Користувача за вказаним індитифікатором користувача (ID) було не знайдено. Будь ласка, спробуйте ще ра',
        );
      });
  }

  async findByUsername(userName: string) {
    return this.prismaService.user
      .findFirst({
        where: { userName: userName },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error(
          'Сталася помилка під час пошуку користувача за вказаним псевдонімом. Будь ласка, спробуйте ще раз',
          err,
        );
        throw new NotFoundException(
          `Користувача із зазначеним псевдонімом: ${userName} не було знайдено. Будь ласка, спробуйте ще раз`,
        );
      });
  }

  async findByEmail(email: string) {
    return this.prismaService.user
      .findUnique({
        where: { email },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error(
          'Сталася помилка під час пошуку користувача за вказaнoю адресою електронної скриньки. Будь ласка, спробуйте ще раз',
          err,
        );
        throw new NotFoundException(
          'Користувача за вказanoю адресою електронної скриньки не знайдено. Будь ласка, спробуйте ще раз',
        );
      });
  }

  async findByPhone(phone: string) {
    return this.prismaService.user
      .findFirst({
        where: { phone },
      })
      .then((foundedUser) => {
        if (!foundedUser) {
          return null;
        }

        return foundedUser;
      })
      .catch((err) => {
        this.logger.error(
          'Сталася помилка під час пошуку користувача за вказаним номером мобільного телефону. Будь ласка, спробуйте ще раз',
          err,
        );
        throw new NotFoundException(
          'Користувача за вказаним номером мобільного телефону не знайдено. Будь ласка, спробуйте ще раз',
        );
      });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return this.prismaService.user
      .delete({
        where: { id },
      })
      .then((deletedUser) => {
        return {
          message:
            'Користувача було успішно видалено з системи агромаркетрлейсу "Grassy"',
          deletedUser,
        };
      })
      .catch((err: Error) => {
        throw new Error(
          `Сталася помилка під час видалення користувача із системи агромаркетрлейсу "Grassy": ${err.message}`,
        );
      });
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
