"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.create = function (createUserDto) {
        return this.userService.create(createUserDto);
    };
    UserController.prototype.findAll = function () {
        return this.userService.findAll();
    };
    UserController.prototype.findOne = function (id) {
        return this.userService.findOne(+id);
    };
    UserController.prototype.findByUsername = function (username) {
        return this.userService.findByUsername(username);
    };
    UserController.prototype.findByEmail = function (email) {
        return this.userService.findByEmail(email);
    };
    UserController.prototype.findByPhone = function (phone) {
        return this.userService.findByEmail(phone);
    };
    UserController.prototype.update = function (id) {
        return this.userService.update(+id);
    };
    UserController.prototype.remove = function (id) {
        return this.userService.remove(+id);
    };
    __decorate([
        common_1.Post(),
        __param(0, common_1.Body())
    ], UserController.prototype, "create");
    __decorate([
        common_1.Get()
    ], UserController.prototype, "findAll");
    __decorate([
        common_1.Get('find-one/:id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "findOne");
    __decorate([
        common_1.Get('find-by-username/:username'),
        __param(0, common_1.Param('username'))
    ], UserController.prototype, "findByUsername");
    __decorate([
        common_1.Get('find-by-email/:email'),
        __param(0, common_1.Param('email'))
    ], UserController.prototype, "findByEmail");
    __decorate([
        common_1.Get('find-by-email/:email'),
        __param(0, common_1.Param('email'))
    ], UserController.prototype, "findByPhone");
    __decorate([
        common_1.Patch('updaete/:id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "update");
    __decorate([
        common_1.Delete(':id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "remove");
    UserController = __decorate([
        common_1.Controller('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
