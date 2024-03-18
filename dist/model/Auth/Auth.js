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
exports.Auth = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Auth = class Auth extends sequelize_typescript_1.Model {
};
exports.Auth = Auth;
Auth.TABLE_NAME = "LAPEL_AUTH";
Auth.Auth_ID = "id";
Auth.Auth_Cid = "clientid";
Auth.Auth_Cs = "clientsecret";
Auth.Auth_Url = "clienturl";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Auth.Auth_ID }),
    __metadata("design:type", Number)
], Auth.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), field: Auth.Auth_Cid, unique: true }),
    __metadata("design:type", String)
], Auth.prototype, "clientid", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), field: Auth.Auth_Cs, }),
    __metadata("design:type", String)
], Auth.prototype, "clientsecret", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), field: Auth.Auth_Url }),
    __metadata("design:type", String)
], Auth.prototype, "clienturl", void 0);
exports.Auth = Auth = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: Auth.TABLE_NAME,
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Auth);
