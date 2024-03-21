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
exports.MaterialRepo = void 0;
const Showroom_1 = require("../../model/Warehouse/Showroom/Showroom");
const ShowroomImages_1 = require("../../model/Warehouse/Showroom/ShowroomImages");
const Images_1 = require("../../model/Common/Images");
const CustomId_1 = require("../../model/Common/CustomId");
const RowMaterial_1 = require("../../model/Metirial/RowMaterial/RowMaterial");
const RowMaterialImages_1 = require("../../model/Metirial/RowMaterial/RowMaterialImages");
const RelatedRowMaterial_1 = require("../../model/Metirial/RowMaterial/RelatedRowMaterial");
const MaterialStock_1 = require("../../model/Metirial/Stock/MaterialStock");
const MainStock_1 = require("../../model/Metirial/Stock/MainStock");
const Cost_1 = require("../../model/Metirial/Cost/Cost");
const Supplier_1 = require("../../model/Metirial/Supplier/Supplier");
const Category_1 = require("../../model/Common/Category/Category");
const SubCategory_1 = require("../../model/Common/Category/SubCategory");
class MaterialRepo {
    create(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCustomId = yield CustomId_1.CustomId.create({
                    customId: model.customId,
                    referanceTable: "Row Material",
                });
                if (!newCustomId) {
                    throw new Error("This Custom Id is already exists! Try again");
                }
                else {
                    const newQR = yield Images_1.Image.create({
                        imageName: model.qr.imageName,
                        imageData: model.qr.imageData,
                        imageURL: model.qr.imageURL,
                        imagelocation: model.qr.imagelocation,
                        imageDescription: model.qr.imageDescription,
                    });
                    const createdModel = yield RowMaterial_1.RowMaterial.create({
                        name: model.name,
                        customId: newCustomId.customId,
                        description: model.description,
                        information: model.information,
                        supplierId: model.supplierId,
                        categoryId: model.categoryId,
                        subCategoryId: model.subCategoryId,
                        unitTypeId: model.unitTypeId,
                        qr: newQR.id,
                        levelOfSafty: model.levelOfSafty,
                        discount: model.discount,
                        stockAlert: model.stockAlert,
                        featured: model.featured,
                        live: model.live,
                        stockMinus: model.stockMinus,
                    });
                    const imgList = model.imageList;
                    if (imgList) {
                        imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const img = yield Images_1.Image.create({
                                imageName: element.imageName,
                                imageData: element.imageData,
                                imageURL: element.imageURL,
                                imagelocation: element.imagelocation,
                                imageDescription: element.imageDescription,
                            });
                            const modelImages = yield RowMaterialImages_1.RowMaterialImages.create({
                                rowMaterialId: createdModel.id,
                                imageId: img.id,
                            });
                        }));
                    }
                    const relatedRowMaterial = model.relatedFabric;
                    if (relatedRowMaterial) {
                        relatedRowMaterial.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                            const newRelatedFabric = yield RelatedRowMaterial_1.RelatedRowMaterial.create({
                                fabricId: createdModel.id,
                                relatedFabricId: element.rowMaterialId,
                            });
                        }));
                    }
                    let totalStock = 0;
                    const stocckList = model.stockData;
                    if (stocckList) {
                        for (const element of stocckList) {
                            const newStock = yield MaterialStock_1.MaterialStock.create({
                                customId: newCustomId.customId,
                                wearhouseId: element.wearhouseId,
                                showroomId: element.showroomId,
                                value: element.value,
                            });
                            totalStock = totalStock + element.value;
                        }
                        const mainStock = yield MainStock_1.MainStock.create({
                            customId: newCustomId.customId,
                            mainStock: totalStock,
                            liveStock: totalStock,
                            pendingStock: 0,
                            usedStock: 0,
                            totalStock: totalStock,
                        });
                    }
                    const costData = model.cost;
                    if (costData) {
                        const newCost = yield Cost_1.Cost.create({
                            customId: newCustomId.customId,
                            totalUnit: costData.totalUnit,
                            unitCost: costData.unitCost,
                            totalCost: costData.totalCost,
                        });
                    }
                }
            }
            catch (err) {
                const result = yield RowMaterial_1.RowMaterial.findOne({ where: { name: model.name } });
                if (result) {
                    throw new Error("Failed to create Row Material! Row Material with this name already exists!");
                }
                throw new Error("Failed to create Row Material! | " + err.message);
            }
        });
    }
    update(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield RowMaterial_1.RowMaterial.findOne({ where: { id: model.id } });
                if (!result) {
                    return false;
                }
                else {
                    result.name = model.name;
                    result.description = model.description;
                    result.information = model.information;
                    result.supplierId = model.supplierId;
                    result.categoryId = model.categoryId;
                    result.subCategoryId = model.subCategoryId;
                    result.unitTypeId = model.unitTypeId;
                    result.levelOfSafty = model.levelOfSafty;
                    result.stockAlert = model.stockAlert;
                    result.featured = model.featured;
                    result.live = model.live;
                    result.stockMinus = model.stockMinus;
                    yield result.save();
                }
                const qr = yield Images_1.Image.findOne({ where: { id: result.qr } });
                if (qr) {
                    qr.imageName = model.qr.imageName;
                    qr.imageData = model.qr.imageData;
                    qr.imageURL = model.qr.imageURL;
                    qr.imagelocation = model.qr.imagelocation;
                    qr.imageDescription = model.qr.imageDescription;
                    yield qr.save();
                }
                const wimgList = (yield RowMaterialImages_1.RowMaterialImages.findAll({ where: { fabricId: model.id }, }));
                yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                    yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                })));
                yield RowMaterialImages_1.RowMaterialImages.destroy({ where: { fabricId: model.id } });
                const imgList = model.imageList;
                imgList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const img = yield Images_1.Image.create({
                        imageName: element.imageName,
                        imageData: element.imageData,
                        imageURL: element.imageURL,
                        imagelocation: element.imagelocation,
                        imageDescription: element.imageDescription,
                    });
                    const modelImages = yield RowMaterialImages_1.RowMaterialImages.create({
                        row: model.id,
                        imageId: img.id,
                    });
                }));
                yield RelatedRowMaterial_1.RelatedRowMaterial.destroy({ where: { fabricId: model.id } });
                const relatedFabList = model.relatedFabric;
                relatedFabList.forEach((element) => __awaiter(this, void 0, void 0, function* () {
                    const newRelatedFabric = yield RelatedRowMaterial_1.RelatedRowMaterial.create({
                        fabricId: model.id,
                        rowMaterialId: element.rowMaterialId,
                    });
                }));
                return true;
            }
            catch (err) {
                throw new Error("Failed to update Row Material! | " + err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Showroom_1.Showroom.findAll({ where: { id: id } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const wimgList = (yield ShowroomImages_1.ShowroomImages.findAll({
                        where: { showroomId: element.id },
                    }));
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        yield Images_1.Image.destroy({ where: { id: imgElement.imageId } });
                    })));
                    yield ShowroomImages_1.ShowroomImages.destroy({ where: { showroomId: element.id } });
                })));
                yield Showroom_1.Showroom.destroy({ where: { id: id } });
                return true;
            }
            catch (err) {
                throw new Error("Failed to delete Showroom! | " + err.message);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield RowMaterial_1.RowMaterial.findAll({ where: { id: id } });
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const stocData = (yield MaterialStock_1.MaterialStock.findAll({ where: { customId: element.customId } }));
                    const qrData = (yield Images_1.Image.findOne({ where: { id: element.qr } }));
                    const wimgList = (yield RowMaterialImages_1.RowMaterialImages.findAll({ where: { rowMaterialId: element.id } }));
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = (yield Images_1.Image.findOne({ where: { id: imgElement.imageId } }));
                        imgList.push(img);
                    })));
                    const relatedRowMat = (yield RelatedRowMaterial_1.RelatedRowMaterial.findAll({ where: { rowMaterialId: element.id } }));
                    const costData = (yield Cost_1.Cost.findOne({ where: { customId: element.customId } }));
                    const supplierData = (yield Supplier_1.Supplier.findOne({ where: { id: element.supplierId } }));
                    const categoryData = (yield Category_1.Category.findOne({ where: { id: element.supplierId } }));
                    const subCategoryData = (yield SubCategory_1.SubCategory.findOne({ where: { id: element.supplierId } }));
                    const tempModel = {
                        id: element.id,
                        name: element.name,
                        customId: element.customId,
                        description: element.description,
                        information: element.information,
                        stockData: stocData,
                        categoryId: categoryData,
                        subCategoryId: subCategoryData,
                        unitTypeId: element.unitTypeId,
                        qr: qrData,
                        imageList: imgList,
                        relatedRowMaterial: relatedRowMat,
                        levelOfSafty: element.levelOfSafty,
                        discount: element.discount,
                        stockAlert: element.stockAlert,
                        featured: element.featured,
                        live: element.live,
                        stockMinus: element.stockMinus,
                        supplierId: supplierData,
                        cost: costData,
                    };
                    Wlist.push(tempModel);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Row Material! | " + err.message);
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield RowMaterial_1.RowMaterial.findAll();
                if (!result || result.length === 0) {
                    throw new Error("Data not found!");
                }
                const Wlist = [];
                yield Promise.all(result.map((element) => __awaiter(this, void 0, void 0, function* () {
                    const stocData = (yield MaterialStock_1.MaterialStock.findAll({ where: { customId: element.customId } }));
                    const qrData = (yield Images_1.Image.findOne({ where: { id: element.qr } }));
                    const wimgList = (yield RowMaterialImages_1.RowMaterialImages.findAll({ where: { rowMaterialId: element.id } }));
                    let imgList = [];
                    yield Promise.all(wimgList.map((imgElement) => __awaiter(this, void 0, void 0, function* () {
                        const img = (yield Images_1.Image.findOne({ where: { id: imgElement.imageId } }));
                        imgList.push(img);
                    })));
                    const relatedRowMat = (yield RelatedRowMaterial_1.RelatedRowMaterial.findAll({ where: { rowMaterialId: element.id } }));
                    const costData = (yield Cost_1.Cost.findOne({ where: { customId: element.customId } }));
                    const supplierData = (yield Supplier_1.Supplier.findOne({ where: { id: element.supplierId } }));
                    const categoryData = (yield Category_1.Category.findOne({ where: { id: element.supplierId } }));
                    const subCategoryData = (yield SubCategory_1.SubCategory.findOne({ where: { id: element.supplierId } }));
                    const tempModel = {
                        id: element.id,
                        name: element.name,
                        customId: element.customId,
                        description: element.description,
                        information: element.information,
                        stockData: stocData,
                        categoryId: categoryData,
                        subCategoryId: subCategoryData,
                        unitTypeId: element.unitTypeId,
                        qr: qrData,
                        imageList: imgList,
                        relatedRowMaterial: relatedRowMat,
                        levelOfSafty: element.levelOfSafty,
                        discount: element.discount,
                        stockAlert: element.stockAlert,
                        featured: element.featured,
                        live: element.live,
                        stockMinus: element.stockMinus,
                        supplierId: supplierData,
                        cost: costData,
                    };
                    Wlist.push(tempModel);
                })));
                return Wlist;
            }
            catch (err) {
                throw new Error("Failed to get Row Material! | " + err.message);
            }
        });
    }
}
exports.MaterialRepo = MaterialRepo;
