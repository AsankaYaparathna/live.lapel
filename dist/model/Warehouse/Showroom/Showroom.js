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
exports.Showroom = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const OpeningTime_1 = require("./OpeningTime");
const ShowroomImages_1 = require("./ShowroomImages");
let Showroom = class Showroom extends sequelize_typescript_1.Model {
};
exports.Showroom = Showroom;
Showroom.SHOWROOM_TABLE_NAME = "LAPEL_SHOWROOM";
Showroom.SHOWROOM_ID = "id";
Showroom.SHOWROOM_NAME = "name";
Showroom.SHOWROOM_ADDRESS = "address";
Showroom.SHOWROOM_GOOGLE_LOCATION = "googleLocation";
Showroom.SHOWROOM_CONTACT_NO = "contactNo";
Showroom.SHOWROOM_DESCRIPTION = "description";
Showroom.SHOWROOM_IMAGE_LIST = "imageList";
Showroom.SHOWROOM_OPEN_TIME = "timeList";
Showroom.SHOWROOM_IS_LIVE = "isLive";
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Showroom.SHOWROOM_ID }),
    __metadata("design:type", Number)
], Showroom.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(100), field: Showroom.SHOWROOM_NAME }),
    __metadata("design:type", String)
], Showroom.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: Showroom.SHOWROOM_ADDRESS }),
    __metadata("design:type", Object)
], Showroom.prototype, "address", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING(255), field: Showroom.SHOWROOM_GOOGLE_LOCATION }),
    __metadata("design:type", String)
], Showroom.prototype, "googleLocation", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.JSON, field: Showroom.SHOWROOM_CONTACT_NO }),
    __metadata("design:type", Object)
], Showroom.prototype, "contactNo", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, field: Showroom.SHOWROOM_DESCRIPTION }),
    __metadata("design:type", String)
], Showroom.prototype, "description", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, field: Showroom.SHOWROOM_IS_LIVE }),
    __metadata("design:type", Boolean)
], Showroom.prototype, "isLive", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => ShowroomImages_1.ShowroomImages, { foreignKey: Showroom.SHOWROOM_IMAGE_LIST }),
    __metadata("design:type", Array)
], Showroom.prototype, "imageList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => OpeningTime_1.OpenTime, { foreignKey: Showroom.SHOWROOM_OPEN_TIME }),
    __metadata("design:type", Array)
], Showroom.prototype, "timeList", void 0);
exports.Showroom = Showroom = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "LAPEL_SHOWROOM",
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt'
    })
], Showroom);
