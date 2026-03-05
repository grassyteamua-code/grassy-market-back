import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';
import { StringValue } from 'ms';

export const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => {
  const expiresIn: StringValue | number = config.get('JWT_EXPIRES', '5m');

  return {
    secret: config.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn,
    },
  };
};

export const jwtModuleAsyncOptions = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
