import { MatchPasswordsConstraint } from '../../validators/match-password.constrains';
import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { IsStrongPassword, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends CreateUserDto {
  @ApiProperty({
    example: 'myPassword123!',
    description: 'Пароль користувача маркетлейсу "Grassy"',
  })
  @IsStrongPassword(
    {},
    {
      message:
        'Повторний пароль повиннен містити цифри, великі та малі літери та спеціальні символи, а також містити, як мінімум, вісім символів або більше',
    },
  )
  @MinLength(8, {
    message:
      'Повторний пароль повинен містити, як мінімум, вісім символів або більше',
  })
  @Validate(MatchPasswordsConstraint)
  repeatPassword!: string;
}
