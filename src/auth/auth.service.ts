import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  register(registerDto: RegisterDto): Promise<User> {
    const createUserDto = registerDto;

    delete createUserDto.repeatPassword;

    const createdUser = this.userService.create(createUserDto);

    return createdUser;
  }

  async login(loginDto: LoginDto) {
    const { userName, password } = loginDto;

    const user: User = await this.userService
      .findByUsername(userName)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    const isPasswordMatch = user && compareSync(password, user?.password);

    if (!user || !isPasswordMatch) {
      const textError =
        'Недійсний логін або пароль. Будь ласка, спробуйте ввести ще раз.';
      this.logger.error(textError);
      throw new UnauthorizedException(textError);
    }

    const accessToken = this.jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
    });

    const refreshToken = (userId: string) => {
        
    }

    return user;
  }
}
