import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, {
    message: 'Please, provide a valid email address',
  })
  @IsNotEmpty({
    message: 'Email address is required',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Пароль повинен містити як мінімум одну літеру верхнього регістру, одну літеру нижнього регістру, одну цифру та один спеціальний символ'
  })
  password: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}