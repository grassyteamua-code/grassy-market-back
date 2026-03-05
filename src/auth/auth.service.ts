import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenService } from '../token/token.service';
import { User } from '@prisma/client';

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

    return this.tokenService.generateTokens(user);
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.prismaService.token.delete({ where: { token: refreshToken } });
  }
}
