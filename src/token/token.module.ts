import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncOptions } from '../config/jwt-module.config';
import { UserModule } from '../user/user.module';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.registerAsync(jwtModuleAsyncOptions()), UserModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
