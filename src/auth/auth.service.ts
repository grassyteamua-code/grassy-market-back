import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from '@user/user.service';
import { LoginDto } from './dto/login/login.dto';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { TokenService } from '../token/token.service';
import { ITokens } from '../auth/interfaces/token.interface';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}

  register(registerDto: RegisterDto): Promise<User> {
    const createUserDto = registerDto;
    delete createUserDto.repeatPassword;

    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }

  async login(loginDto: LoginDto): Promise<ITokens> {
    const { userName, password } = loginDto;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: User = await this.userService
      .findByUsername(userName)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    const isPasswordMatch = user && compareSync(password, user?.password);

    if (!user || !isPasswordMatch) {
      const textError = 'Неверные логин или пароль';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.tokenService.generateTokens(user);
  }

  async deleteRefreshToken(refreshToken: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await this.prismaService.token.delete({ where: { token: refreshToken } });
  }
}
