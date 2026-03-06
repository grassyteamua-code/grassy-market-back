import { 
  Controller, 
  Get, 
  Res 
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Public } from '@auth/guards/jwt-auth.guards';
import { Cookies } from '@decorators/cookie.decoration';
import { AuthService } from '@auth/auth.service';

const REFRESH_TOKEN = 'refreshToken';

@Public()
@Controller('token')
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly authService: AuthService,
  ) {}
  
  @Get('refresh-tokens')
  async refreshTokens(
    @Cookies(REFRESH_TOKEN): refreshToken: string,
    @Res() response: Response,
  {
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Рефреш токен відсутній. Будь ласка, увійдіть в систему знову.',
      );
    }
    
    const tokens = await this.authService.refreshTokens(refreshToken);

    if (!tokens) {
      throw new UnauthorizedException(
        'Невірний рефреш токен. Будь ласка, увійдіть в систему знову.',
      );
    }

    this.setRefreshTokenCookies(newRefreshToken, response);
  }

   private setRefreshTokenCookies(
    refreshToken: Token,
    response: Response,
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException(
        'Помилка при встановленні рефреш токена. Будь ласка, спробуйте ще раз.',
      );
    }

    const cookieName = 'refreshToken';
    const cookieValue: string = refreshToken.token as string;
    const cookieExpectTime = dayjs().add(7, 'day').toDate();

    const cookieOptions: ICookieOptions = {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      path: '/',
      exp: cookieExpectTime,
    };

    response.cookie(cookieName, cookieValue, cookieOptions);
    response.status(HttpStatus.CREATED).json({ message: 'Рефреш токен був успішно встановлений в куки.' });
  };

}
