import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from "./user/user.service";
import { PrismaService } from "./prisma/prisma.service";
import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [AppService, UserService, PrismaService],
  imports: [AuthModule],
})
export class AppModule {}
