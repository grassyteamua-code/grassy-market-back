import {
  IsEmail,
  IsString,
  MinLength,
  IsEnum,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { Role, ClientType } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsEnum(ClientType)
  clientType: ClientType;

  // Фізична особа
  @IsOptional() @IsString() firstName?: string;
  @IsOptional() @IsString() lastName?: string;
  @IsOptional() @IsString() address?: string;

  // Юридична особа
  @IsOptional() @IsString() companyName?: string;
  @IsOptional() @IsString() contactPerson?: string;
  @IsOptional() @IsString() companyAddress?: string;
  @IsOptional() @IsString() edrpou?: string;

  // Спільне та Перевізник
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() vehicleDetails?: string;
  @IsOptional() @IsString() locations?: string;
}
