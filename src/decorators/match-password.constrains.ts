import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@ValidatorConstraint({ async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(repeatPassword: string, args: ValidationArguments): boolean {
    const { password } = args.object as CreateUserDto;

    return password === repeatPassword;
  }

  defaultMessage(args: ValidationArguments): string {
    const { password } = args.object as CreateUserDto;
    const repeatPassword = args.value as string;

    if (password !== repeatPassword) {
      console.log(
        `Пароль та повторний пароль не зівпадають: ${password} !== ${repeatPassword}`,
      );
    }

    return 'Пароль та повторний пароль повинні зівпадати.';
  }
}
