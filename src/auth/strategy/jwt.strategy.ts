import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTPayload } from '../interfaces/access-token.interface';
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

  async validate(jwtPayload: JWTPayload) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const user: User = await this.userService
      .findById(jwtPayload.userId)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    if (!user) {
      throw new UnauthorizedException();
    }

    return jwtPayload;
  }
}
