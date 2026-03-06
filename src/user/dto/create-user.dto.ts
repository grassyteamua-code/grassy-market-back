import {
  IsEmail,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Будь ласка, введіть адресу Вашої електронної скриньки',
    },
  )
  email!: string;

  @IsString({ message: 'Нікнейм користувача повинно бути рядком' })
  @Length(2, 20, {
    message: 'Довжина нікнейму користувача повинна бути від 2 до 20 символів',
  })
  userName!: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Пароль повинен містити цифри, великі та малі літери, а також спеціальні символи',
    },
  )
  @MinLength(8, { message: 'Пароль повинен містити мінімум 8 символів' })
  password!: string;

  @IsStrongPassword(
    {},
    {
      message:
        'Пароль повинен містити цифри, великі та малі літери, а також спеціальні символи',
    },
  )
  @MinLength(8, { message: 'Пароль повинен містити мінімум 8 символів' })
  repeatPassword!: string;

  @IsString({ message: 'Номер мобільного телефона повинен бути рядком' })
  @Length(6, 20, {
    message: 'Довжина номера телефона повинна бути від 6 до 20 символів',
  })
  phone!: string;

  @IsString({ message: "Ім'я користувача повинно бути рядком" })
  @Length(2, 50, {
    message: 'Довжина імені користувача повинна бути від 2 до 50 символів',
  })
  firstName!: string;

  @IsString({ message: 'Прізвище користувача повинно бути рядком' })
  @Length(2, 50, {
    message: 'Довжина прізвища повинна бути від 2 до 50 символів',
  })
  lastName!: string;

  @IsString({ message: 'По-батькові користувача повинно бути рядком' })
  @Length(2, 50, {
    message: 'Довжина по-батькові повинна бути від 2 до 50 символів',
  })
  middleName!: string;
}
