"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CreateUserDto = void 0;
var register_dto_1 = require("src/auth/dto/register/register.dto");
var CreateUserDto = /** @class */ (function (_super) {
    __extends(CreateUserDto, _super);
    function CreateUserDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CreateUserDto;
}(register_dto_1.RegisterDto));
exports.CreateUserDto = CreateUserDto;
