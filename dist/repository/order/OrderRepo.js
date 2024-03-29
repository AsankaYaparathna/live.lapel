"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepo = void 0;
const Cart_1 = require("../../model/Cart/Cart");
const CartOrder_1 = require("../../model/Cart/CartOrder");
const OrderInvoice_1 = require("../../model/Cart/OrderInvoice");
const User_1 = require("../../model/Customer/User");
const CustomProduct_1 = require("../../model/Product/Custom Product/CustomProduct");
const PackageElement_1 = require("../../model/Product/Packages/PackageElement");
const Utils_1 = require("../../utils/Utils");
const OrderLogsRepo_1 = require("./OrderLogsRepo");
class OrderRepo {
    checkout(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCreatedModel = yield CartOrder_1.CartOrder.create({
                    customerId: model.customerId,
                    noOfItems: model.noOfItems,
                    subTotal: model.subTotal,
                    shippingCost: model.shippingCost,
                    totalAmmount: model.totalAmmount,
                    balance: model.balance,
                    firstName: model.firstName,
                    lastName: model.lastName,
                    mobile: model.mobile,
                    mobile2: model.mobile2,
                    email: model.email,
                    billing: model.billing,
                    deliveryMethod: model.deliveryMethod,
                    notes: model.notes,
                    status: model.status,
                    orderStatus: model.orderStatus,
                    cartIdList: model.cartIdList,
                    orderDiscount: model.orderDiscount,
                    orderExtraCharges: model.orderExtraCharges,
                });
                const logModel = {
                    orderId: newCreatedModel.id,
                    user: model.log.user,
                    action: model.log.action,
                    type: model.log.type
                };
                yield new OrderLogsRepo_1.OrderLogsRepo().create(logModel);
                return newCreatedModel;
            }
            catch (err) {
                throw new Error("Failed to checkout order! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield CartOrder_1.CartOrder.findAll();
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbModel = yield CartOrder_1.CartOrder.findAll({ where: { id: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order data! | " + err.message);
            }
        });
    }
    getIDs(id) {
        return __awaiter(this, void 0, void 0, function* () {
            ;
            ;
            ;
            try {
                const dbModel = yield CartOrder_1.CartOrder.findOne({ where: { id: id } });
                if (!dbModel) {
                    throw new Error("Data not found!");
                }
                const cartList = dbModel.cartIdList;
                const crdIDsList = [];
                yield Promise.all(cartList.map((model) => __awaiter(this, void 0, void 0, function* () {
                    const data = model;
                    const cardData = yield Cart_1.Cart.findOne({ where: { id: data.cartId } });
                    if (!cardData) {
                        throw new Error("Cart Data not found!");
                    }
                    const pkgData = yield PackageElement_1.PackageElement.findAll({ where: { packageId: cardData.packageId } });
                    if (!pkgData) {
                        throw new Error("Package Element Data not found!");
                    }
                    yield Promise.all(pkgData.map((model2) => __awaiter(this, void 0, void 0, function* () {
                        const customProduct = yield CustomProduct_1.CustomProduct.findOne({ where: { id: model2.customProdId } });
                        if (!customProduct) {
                            throw new Error("Custom Product Data not found!");
                        }
                        const rData = { id: customProduct.customId, name: customProduct.name };
                        crdIDsList.push(rData);
                    })));
                })));
                return crdIDsList;
            }
            catch (err) {
                throw new Error("Failed to get order data! | " + err.message);
            }
        });
    }
    getByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dbUser = yield User_1.User.findOne({ where: { id: id } });
                if (!dbUser) {
                    throw new Error("User not found!");
                }
                const dbModel = yield CartOrder_1.CartOrder.findAll({ where: { customerId: id } });
                if (!dbModel[0]) {
                    throw new Error("Data not found!");
                }
                return yield dbModel;
            }
            catch (err) {
                throw new Error("Failed to get order data! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.customerId = model.customerId;
                    newModel.firstName = model.firstName;
                    newModel.lastName = model.lastName;
                    newModel.mobile = model.mobile;
                    newModel.mobile2 = model.mobile2;
                    newModel.email = model.email;
                    newModel.billing = model.billing;
                    newModel.deliveryMethod = model.deliveryMethod;
                    newModel.notes = model.notes;
                    newModel.status = model.status;
                    newModel.orderStatus = model.orderStatus;
                    newModel.cartIdList = model.cartIdList;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order! | " + err.message);
            }
        });
    }
    updateDeliveryDate(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.deliveryMethod.deliveryDate = model.deliveryDate;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order! | " + err.message);
            }
        });
    }
    addSpecialNote(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.specialNote = model.specialNote;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order! | " + err.message);
            }
        });
    }
    updatePayment(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.payment = model.payment;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order payment details! | " + err.message);
            }
        });
    }
    updateStatus(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: model.id }, });
                if (!newModel) {
                    return false;
                }
                else {
                    newModel.orderStatus = model.orderStatus;
                    yield newModel.save();
                }
                return true;
            }
            catch (err) {
                throw new Error("Failed to update order status! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newModel = yield CartOrder_1.CartOrder.findOne({ where: { id: id } });
                if (!newModel) {
                    throw new Error("Data not found!");
                }
                yield CartOrder_1.CartOrder.destroy({ where: { id: id } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Custom Product Package! | " + err.message);
            }
        });
    }
    shopCheckout(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCreatedModel = yield CartOrder_1.CartOrder.create({
                    customerId: model.customerId,
                    amount: model.amount,
                    cartIdList: model.cartIdList,
                    orderStatus: model.orderStatus,
                    firstName: model.firstName,
                    lastName: model.lastName,
                    mobile: model.mobile,
                    mobile2: model.mobile2,
                    email: model.email,
                    billing: model.billing,
                    deliveryMethod: model.deliveryMethod,
                    notes: model.notes,
                    status: true,
                    payment: model.payment,
                    orderDiscount: model.orderDiscount,
                    orderExtraCharges: model.orderExtraCharges,
                });
                const logModel = {
                    orderId: newCreatedModel.id,
                    user: model.log.user,
                    action: model.log.action,
                    type: model.log.type
                };
                yield new OrderLogsRepo_1.OrderLogsRepo().create(logModel);
                if (!newCreatedModel) {
                    throw new Error("Failed to checkout order! | ");
                }
                const lastModel = yield OrderInvoice_1.OrderInvoice.findOne({ order: [['createdAt', 'DESC']] });
                const invoiceNo = yield (0, Utils_1.generateInvoiceNo)(lastModel);
                const newInv = yield OrderInvoice_1.OrderInvoice.create({
                    customerId: newCreatedModel.customerId,
                    invoiceNo: invoiceNo,
                    invoiceDate: new Date(),
                    orderId: newCreatedModel.id
                });
                return newCreatedModel;
            }
            catch (err) {
                throw new Error("Failed to checkout order! | " + err.message);
            }
        });
    }
    getInvoiceByCartId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderModel = yield CartOrder_1.CartOrder.findOne({ where: { id: id } });
                if (!orderModel) {
                    throw new Error("Data not found!");
                }
                const invoiceModel = yield OrderInvoice_1.OrderInvoice.findOne({ where: { orderId: id } });
                if (!invoiceModel) {
                    throw new Error("Data not found!");
                }
                const result = {
                    invoiceNo: invoiceModel.invoiceNo,
                    invoiceDate: invoiceModel.invoiceDate,
                    orderDetails: orderModel
                };
                return yield result;
            }
            catch (err) {
                throw new Error("Failed to get invoice! | " + err.message);
            }
        });
    }
    getByInvId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoiceModel = yield OrderInvoice_1.OrderInvoice.findOne({ where: { orderId: id } });
                if (!invoiceModel) {
                    throw new Error("Data not found!");
                }
                const orderModel = yield CartOrder_1.CartOrder.findOne({ where: { id: invoiceModel.orderId } });
                if (!orderModel) {
                    throw new Error("Data not found!");
                }
                const result = {
                    invoiceNo: invoiceModel.invoiceNo,
                    invoiceDate: invoiceModel.invoiceDate,
                    orderDetails: orderModel
                };
                return yield result;
            }
            catch (err) {
                throw new Error("Failed to get invoice! | " + err.message);
            }
        });
    }
    getByInvNo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invoiceModel = yield OrderInvoice_1.OrderInvoice.findOne({ where: { invoiceNo: id } });
                if (!invoiceModel) {
                    throw new Error("Data not found!");
                }
                const orderModel = yield CartOrder_1.CartOrder.findOne({ where: { id: invoiceModel.orderId } });
                if (!orderModel) {
                    throw new Error("Data not found!");
                }
                const result = {
                    invoiceNo: invoiceModel.invoiceNo,
                    invoiceDate: invoiceModel.invoiceDate,
                    orderDetails: orderModel
                };
                return yield result;
            }
            catch (err) {
                throw new Error("Failed to get invoice! | " + err.message);
            }
        });
    }
}
exports.OrderRepo = OrderRepo;
