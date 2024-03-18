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
exports.CustomProduct = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Category_1 = require("../../Common/Category/Category");
const CategoryType_1 = require("../../Common/Category/CategoryType");
const CustomProductOption_1 = require("./CustomProductOption");
let CustomProduct = class CustomProduct extends sequelize_typescript_1.Model {
};
exports.CustomProduct = CustomProduct;
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" }),
    __metadata("design:type", Number)
], CustomProduct.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Category_1.Category),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "categoryId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: "categoryName" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryName", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => CategoryType_1.CategoryType),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, field: "categoryTypeId" }),
    __metadata("design:type", String)
], CustomProduct.prototype, "categoryTypeId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: "isActive" }),
    __metadata("design:type", Boolean)
], CustomProduct.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => CustomProductOption_1.CustomProductOption, { foreignKey: "customProductOption" }),
    __metadata("design:type", Array)
], CustomProduct.prototype, "customProductOption", void 0);
exports.CustomProduct = CustomProduct = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "LAPEL_CUSTOM_PRODUCT",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], CustomProduct);
