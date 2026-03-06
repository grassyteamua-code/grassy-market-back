import {
  BadRequestException,
  Body,
  Get,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { LoginDto } from './dto/login/login.dto';
import { TokenService } from 'src/token/token.service';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Cookies } from '@decorators/cookie.decoration';
import { getCookieOptions } from '@utils/cookie-options.util';

const REFRESH_TOKEN = process.env.REFRESH_TOKEN || 'REFRESH_TOKEN';

export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const createdUser = this.authService.register(registerDto);

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    if (!createdUser) {
      const textError = 'Ошибка при создании пользователя';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    return createdUser;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tokens = await this.authService.login(loginDto);

    if (!tokens) {
      const textError = 'Ошибка при попытке входа';
      this.logger.error(textError);
      throw new BadRequestException(textError);
    }

    this.tokenService.setRefreshTokenToCookies(tokens, res);
  }

  @Get('logout')
  async logout(
    @Cookies(REFRESH_TOKEN) refreshToken: string,
    @Res() response: Response,
  ) {
    if (!refreshToken) {
      response.sendStatus(HttpStatus.OK);
      return;
    }

    this.authService.deleteRefreshToken(refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const refreshTokenName = this.configService.get('REFRESH_TOKEN');
    const today = new Date();

    response.cookie(refreshTokenName, '', getCookieOptions(today));
    response.sendStatus(HttpStatus.OK);
  }
}
