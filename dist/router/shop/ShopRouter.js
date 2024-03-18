"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderController_1 = __importDefault(require("../../controller/cart/OrderController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class ShopRouter extends BaseRouter_1.default {
    routes() {
        // Protected routes
        //Auth
        //this.router.use(AuthController.authenticateToken);
        this.router.post("/order/checkout/", OrderController_1.default.shopCheckout);
        this.router.post("/order/setOff/", OrderController_1.default.setOff);
        this.router.get("/get/", OrderController_1.default.get);
        this.router.get("/getById/:id", OrderController_1.default.getById);
        //this.router.patch("/update/:id", OrderController.update);
        //this.router.delete("/delete/:id", OrderController.delete);
        this.router.patch("/update/payment/:id", OrderController_1.default.updatePayment);
        this.router.patch("/update/status/:id", OrderController_1.default.updateStatus);
        this.router.get("/invoice/getByOrderId/:id", OrderController_1.default.getInvoiceByCartId);
        this.router.get("/invoice/getById/:id", OrderController_1.default.getByInvId);
        this.router.get("/invoice/getByInvoiceNo/:id", OrderController_1.default.getByInvNo);
    }
}
exports.default = new ShopRouter().router;
