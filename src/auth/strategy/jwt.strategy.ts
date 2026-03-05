import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/interfaces';
import { User } from '@prisma/client';
import { UserService } from '@user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const user: User = await this.userService
      .findById(payload.id)
      .catch((error) => {
        this.logger.error(
          `Помилка при пошуку користувача за JWT payload:`,
          error,
        );
        throw new UnauthorizedException('Invalid token');
      });

    if (!user) {
      throw new UnauthorizedException(
        `Користувач з id ${payload.id} не знайдений`,
      );
    }

    return user;
  }
}
