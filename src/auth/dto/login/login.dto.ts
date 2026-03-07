import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'myPassword123!',
    description: 'Пароль користувача маркетлейсу "Grassy"',
  })
  @IsString({ message: 'Пароль користувача повинен бути рядком' })
  password: string;

  @ApiProperty({
    example: 'john_doe',
    description: 'Ім\'я користувача маркетлейсу "Grassy"',
  })
  @IsString({ message: "Ім'я користувача повинно бути рядком" })
  userName: string;
}
