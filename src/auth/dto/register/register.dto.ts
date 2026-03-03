import {
  IsEmail,
  IsString,
  MinLength,
  Length,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsEmail(
    {},
    { message: 'Будь ласка, введіть адресу Вашої електронної скриньки' },
  )
  email!: string;

  @IsString({
    message: 'Будь ласка, введіть Ваше імя користувача (нікнейм)',
  })
  username!: string;

  @IsStrongPassword(
    {},
    {
      message: 'Будь ласка, введіть Ваш пароль',
    },
  )
  @MinLength(8, {
    message:
      'Довжина пароля повинна бути щонаймешне вісім символів. Пароль повинен містити, як мінімум, одну маленьку літеру, одну велику та спецсимвол',
  })
  password!: string;

  @IsStrongPassword(
    {},
    {
      message: 'Будь ласка, повторіть Ваш пароль',
    },
  )
  @MinLength(8, {
    message: 'Довжина пароля повинна бути щонаймешне вісім символів',
  })
  repeatPassword!: string;

  @IsString({
    message: 'Будь ласка, введіть Ваше імя',
  })
  @Length(2, 50, {
    message: 'Ваше імя повинно бути строкою, а не будь-якими іншими символами',
  })
  firstName!: string;

  @IsString({
    message: 'Будь ласка, введіть Ваше по-батькові',
  })
  @Length(2, 50, {
    message:
      'Ваше по-батькові повинно бути строкою, а не будь-якими іншими символами',
  })
  middleName!: string;

  @IsString({
    message: 'Будь ласка, введіть Ваше по-батькові',
  })
  @Length(2, 50, {
    message:
      'Ваше прізвище повинно бути строкою, а не будь-якими іншими символами',
  })
  lastName!: string;
}
