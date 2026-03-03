"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MatchPasswordConstraint = void 0;
var class_validator_1 = require("class-validator");
var MatchPasswordConstraint = /** @class */ (function () {
    function MatchPasswordConstraint() {
    }
    MatchPasswordConstraint.prototype.validate = function (repeatPassword, args) {
        var password = args.object.password;
        return password === repeatPassword;
    };
    MatchPasswordConstraint.prototype.defaultMessage = function (args) {
        var password = args.object.password;
        var repeatPassword = args.value;
        if (password !== repeatPassword) {
            console.log("\u041F\u0430\u0440\u043E\u043B\u044C \u0442\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C \u043D\u0435 \u0437\u0456\u0432\u043F\u0430\u0434\u0430\u044E\u0442\u044C: " + password + " !== " + repeatPassword);
        }
        return 'Пароль та повторний пароль повинні зівпадати.';
    };
    MatchPasswordConstraint = __decorate([
        class_validator_1.ValidatorConstraint({ async: false })
    ], MatchPasswordConstraint);
    return MatchPasswordConstraint;
}());
exports.MatchPasswordConstraint = MatchPasswordConstraint;
