import { MatchPasswordsConstraint } from '../../validators/match-password.constrains';
import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { IsStrongPassword, MinLength, Validate } from 'class-validator';

export class RegisterDto extends CreateUserDto {
  @IsStrongPassword(
    {},
    {
      message:
        'Повторный пароль должен содержать цифры, заглавные и строчные буквы, а также специальные символы',
    },
  )
  @MinLength(8, {
    message: 'Повторный пароль должен содержать минимум 8 символов',
  })
  @Validate(MatchPasswordsConstraint)
  repeatPassword!: string;
}
