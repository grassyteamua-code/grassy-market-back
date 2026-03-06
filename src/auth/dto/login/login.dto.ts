import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Пароль користувача повинен бути рядком' })
  password: string;

  @IsString({ message: "Ім'я користувача повинно бути рядком" })
  userName: string;
}
