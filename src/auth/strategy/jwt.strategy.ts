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
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(
    jwtPayload: JWTPayload,
    configService: ConfigService,
  ): Promise<JWTPayload> {
    const user: User | null = await this.userService
      .findById(jwtPayload.userId)
      .catch((err: unknown): User | null => {
        if (err instanceof Error) {
          this.logger.error(err.message);
        }
        return null;
      });

    if (!user) {
      throw new UnauthorizedException();
    }
    console.log('configService', configService);

    return jwtPayload;
  }
}
