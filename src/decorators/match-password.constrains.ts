import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false }) 
export class MatchPasswordConstraint implements ValidatorConstraintInterface (
    validate(repeatPassword: string, args: ValidationArguments): boolean {
        const { password } = arg.object as any;

        return password === repeatPassword;
    }

    defaultMessage() {
        console.log("Пароль та повторний пароль не зівпадають.");
    }
)
