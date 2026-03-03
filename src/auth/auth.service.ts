import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register/register.dto';
import { PrismaService } from '@prisma/prisma.service';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async register(registerDto: RegisterDto) {
   
  };

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
