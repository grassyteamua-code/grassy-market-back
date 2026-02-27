import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserType } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserType)
  type: UserType;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  companyName?: string;

  @IsOptional()
  contactPerson?: string;

  @IsOptional()
  companyAddress?: string;

  @IsOptional()
  edrpou?: string;
}