"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterDto = void 0;
var class_validator_1 = require("class-validator");
var RegisterDto = /** @class */ (function () {
    function RegisterDto() {
    }
    __decorate([
        class_validator_1.IsEmail({}, { message: 'Будь ласка, введіть адресу Вашої електронної скриньки' })
    ], RegisterDto.prototype, "email");
    __decorate([
        class_validator_1.IsString({
            message: 'Будь ласка, введіть Ваше імя користувача (нікнейм)'
        })
    ], RegisterDto.prototype, "username");
    __decorate([
        class_validator_1.IsStrongPassword({}, {
            message: 'Будь ласка, введіть Ваш пароль'
        }),
        class_validator_1.MinLength(8, {
            message: 'Довжина пароля повинна бути щонаймешне вісім символів. Пароль повинен містити, як мінімум, одну маленьку літеру, одну велику та спецсимвол'
        })
    ], RegisterDto.prototype, "password");
    __decorate([
        class_validator_1.IsStrongPassword({}, {
            message: 'Будь ласка, повторіть Ваш пароль'
        }),
        class_validator_1.MinLength(8, {
            message: 'Довжина пароля повинна бути щонаймешне вісім символів'
        })
    ], RegisterDto.prototype, "repeatPassword");
    __decorate([
        class_validator_1.IsString({
            message: 'Будь ласка, введіть Ваше імя'
        }),
        class_validator_1.Length(2, 50, {
            message: 'Ваше імя повинно бути строкою, а не будь-якими іншими символами'
        })
    ], RegisterDto.prototype, "firstName");
    __decorate([
        class_validator_1.IsString({
            message: 'Будь ласка, введіть Ваше по-батькові'
        }),
        class_validator_1.Length(2, 50, {
            message: 'Ваше по-батькові повинно бути строкою, а не будь-якими іншими символами'
        })
    ], RegisterDto.prototype, "middleName");
    __decorate([
        class_validator_1.IsString({
            message: 'Будь ласка, введіть Ваше по-батькові'
        }),
        class_validator_1.Length(2, 50, {
            message: 'Ваше прізвище повинно бути строкою, а не будь-якими іншими символами'
        })
    ], RegisterDto.prototype, "lastName");
    return RegisterDto;
}());
exports.RegisterDto = RegisterDto;
