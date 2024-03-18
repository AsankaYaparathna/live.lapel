"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SessionController_1 = __importDefault(require("../../controller/session/SessionController"));
const UserController_1 = __importDefault(require("../../controller/user/UserController"));
const BaseRouter_1 = __importDefault(require("../base/BaseRouter"));
class SessionRouter extends BaseRouter_1.default {
    routes() {
        // Protected routes
        //Auth
        //this.router.use(AuthController.authenticateToken);
        //Admin
        this.router.post("/start/", SessionController_1.default.startSession);
        this.router.post("/session/create/", UserController_1.default.startSession);
    }
}
exports.default = new SessionRouter().router;
