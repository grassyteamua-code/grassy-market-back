import {
  Injectable,
  UnauthorizedException,
  BadRequestException, Body, Post,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';
import { RefreshDto } from "./dto/refresh.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
      private prisma: PrismaService,
      private jwtService: JwtService,
      private configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        clientType: dto.clientType,
        status: 'ACTIVE',
      },
    });

    return this.issueTokens(user);
  }

  async login(
      @Body() dto: LoginDto,
      @Req() req,
      @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(
        dto,
        req.headers['user-agent'],
        req.ip,
    );

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      domain: process.env.COOKIE_DOMAIN,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  async refresh(oldToken: string) {
    const tokens = await this.prisma.refreshToken.findMany();

    let validToken = null;

    for (const t of tokens) {
      const match = await bcrypt.compare(oldToken, t.token);
      if (match) {
        validToken = t;
        break;
      }
    }

    if (!validToken) throw new UnauthorizedException();

    const payload = this.jwtService.verify(oldToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    await this.prisma.refreshToken.delete({
      where: { id: validToken.id },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    return this.issueTokens(user);
  }

  private async issueTokens(user: User) {
    const payload = {
      sub: user.id,
      role: user.role,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES,
    });

    const hashedRefresh = await bcrypt.hash(refreshToken, 12);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRefresh,
        userId: user.id,
        expiresAt: dayjs().add(7, 'day').toDate(),
      },
    });

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: 'Logged out' };
  }
}