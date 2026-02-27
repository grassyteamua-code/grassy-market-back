import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post, UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Roles, RolesGuard } from "./guards/role.guard";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./guards/auth.guard";
import {RefreshDto} from "./dto/refresh.dto";
import {LoginDto} from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }
  @Post('logout')
  async logout(@Body() dto: RefreshDto) {
    await this.prisma.refreshToken.deleteMany({
      where: { token: dto.refreshToken },
    });

    return { message: 'Logged out' };
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const tokenInDb = await this.prisma.refreshToken.findFirst({
      where: { token: dto.refreshToken },
    });

    if (!tokenInDb) throw new UnauthorizedException();

    const payload = this.jwtService.verify(dto.refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return this.generateTokens(payload);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SELLER)
  @Get('seller-only')
  getSellerData() {
    return 'Only sellers';
  }
}
