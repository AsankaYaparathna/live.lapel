"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductController_1 = __importDefault(require("../../controller/product/ProductController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class ProductRouts extends BaseRouter_1.default {
    routes() {
        // Protected routes
        //this.router.use(AuthController.authenticateToken);
        //custom product
        this.router.post("/custom/create/", ProductController_1.default.createCustomProduct);
        this.router.get("/custom/get/", ProductController_1.default.getCustomProduct);
        this.router.get("/custom/getById/:id", ProductController_1.default.getCustomProductById);
        this.router.patch("/custom/update/:id", ProductController_1.default.updateCustomProduct);
        this.router.post("/custom/option/add/:id", ProductController_1.default.addCustomProductOption);
        this.router.patch("/custom/option/update/:id", ProductController_1.default.updateCustomProductOption);
        this.router.delete("/custom/option/delete/:id", ProductController_1.default.deleteCustomProductOption);
        this.router.get("/custom/option/getById/:id", ProductController_1.default.getCustomProductOption);
        this.router.delete("/custom/delete/:id", ProductController_1.default.deleteCustomProduct);
        this.router.get("/custom/getSubOptionById/:id", ProductController_1.default.getSubOptionById);
        //package
        this.router.post("/custom/package/create/", ProductController_1.default.createPackage);
        this.router.get("/custom/package/get/", ProductController_1.default.getPackage);
        this.router.get("/custom/package/getById/:id", ProductController_1.default.getPackageById);
        this.router.patch("/custom/package/update/:id", ProductController_1.default.updatePackage);
        this.router.delete("/custom/package/delete/:id", ProductController_1.default.deletePackage);
        //Rady made
    }
}
exports.default = new ProductRouts().router;
