"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderController_1 = __importDefault(require("../../controller/cart/OrderController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class OrderRouts extends BaseRouter_1.default {
    routes() {
        //this.router.use(AuthController.authenticateToken);
        //order
        this.router.post("/checkout/", OrderController_1.default.checkout);
        this.router.get("/get/", OrderController_1.default.get);
        this.router.get("/getById/:id", OrderController_1.default.getById);
        this.router.get("/getByUserId/:id", OrderController_1.default.getByUserId);
        this.router.patch("/update/:id", OrderController_1.default.update);
        this.router.delete("/delete/:id", OrderController_1.default.delete);
        this.router.patch("/update/payment/:id", OrderController_1.default.updatePayment);
        this.router.patch("/update/status/:id", OrderController_1.default.updateStatus);
        //logs
        this.router.get("/log/get/", OrderController_1.default.logsGet);
        this.router.get("/log/getByLogId/:id", OrderController_1.default.orderLogsGet);
        this.router.get("/log/getByOrderId/:id", OrderController_1.default.orderLogsGetByOrderId);
    }
}
exports.default = new OrderRouts().router;
