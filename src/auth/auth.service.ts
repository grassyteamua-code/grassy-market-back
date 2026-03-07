import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../auth/dto/register/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from '../auth/dto/login/login.dto';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { TokenService } from '../token/token.service';
import { ITokens } from '../auth/interfaces/token.interface';
import { PrismaService } from '../prisma/prisma.service';

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

    return this.userService.create(createUserDto);
  }

  async login(loginDto: LoginDto): Promise<ITokens> {
    const { userName, password } = loginDto;

    const user: User | null = await this.userService
      .findByUsername(userName)
      .catch((err: unknown): null => {
        this.logger.error(err);
        return null;
      });

    const isPasswordMatch = user && compareSync(password, user?.password);

    if (!user || !isPasswordMatch) {
      const textError =
        'Користувачем були введені неправильний логін або паролю. Будь ласка, спробуйте ще раз';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    return this.tokenService.generateTokens(user);
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.prismaService.token
      .delete({ where: { token: refreshToken } })
      .catch((err) => {
        this.logger.error(
          `Сталася помилка під час видалення refresh token: ${err}`,
        );
      });
  }
}
