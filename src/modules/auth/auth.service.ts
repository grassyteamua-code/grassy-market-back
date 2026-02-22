import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/RegisterDto';
import { AuthResponseDto } from './dto/AuthResponseDto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {

  }

  // @ts-ignore
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const {
      email,
      password,
      firstName,
      lastName
    } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });
  }
}
