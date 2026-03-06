import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login/login.dto';
import { compareSync } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import { v4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  register(registerDto: RegisterDto): Promise<User> {
    const createUserDto = registerDto;

    delete createUserDto.repeatPassword;

    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }

  async login(loginDto: LoginDto): Promise<ITokens> {
    const { user, password } = loginDto;

    const user: User = await this.userService
      .findByUsername(user)
      .catch((error) => {
        const usernameIsNotValid = 'Невірне ім\'я користувача або пароль.';
        this.logger.error(`Помилка при пошуку користувача: ${error}`);
        throw new UnauthorizedException(usernameIsNotValid);
      });

      const isPasswordMatch = user && comapareSync(password, user?.password);

      if (!user || !isPasswordMatch) {
        const passwordOrNicknameIsNotValid = 'Невірне ім\'я користувача або пароль.';
        this.logger.error(passwordOrNicknameIsNotValid);
        throw new UnauthorizedException(passwordOrNicknameIsNotValid);
      }

      return this.genarateTokens(user);
  }
}