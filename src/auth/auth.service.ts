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

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    let user: User | null = null;
    try {
      user = await this.userService.findByUsername(username);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : JSON.stringify(err);
      this.logger.error(errorMessage);
    }

    const isPasswordMatch = user && compareSync(password, user?.password);

    if (!user || !isPasswordMatch) {
      const textError =
        'Недійсний логін або пароль. Будь ласка, спробуйте ввести ще раз.';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    const accessToken = this.jwtService.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    const refreshToken = this.getRefreshToken(user.id);
    const result = { accessToken, refreshToken };

    return result;
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.prismaService.token.delete({
      where: {
        token: refreshToken,
      },
    });
  }

  private getRefreshToken = async (userId: string): Promise<any> => {
    const currentDate = dayjs();
    const expireDate = currentDate
      .add(
        this.configService.get('TOKEN_EXPIRATION_UNIT'),
        this.configService.get('TOKEN_EXPIRATION_VALUE'),
      )
      .toDate();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return await this.prismaService.token.create({
      data: {
        token: v4(),
        exp: expireDate,
        userId,
      },
    });
  };
}
