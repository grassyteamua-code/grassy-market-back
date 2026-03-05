import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { jwtModuleAsyncOptions } from '../config/jwt-module.config';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
