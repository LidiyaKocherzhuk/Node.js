"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const commonFields_1 = require("./commonFields");
const config_1 = require("../config/config");
let UserEntity = class UserEntity extends commonFields_1.CommonFields {
};
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 250,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 250,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], UserEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 250,
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        width: 250,
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('users', { database: config_1.config.MYSQL_DATABASE_NAME })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=userEntity.js.map