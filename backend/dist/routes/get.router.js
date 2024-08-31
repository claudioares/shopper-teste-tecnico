"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express_1 = require("express");
const image_usecase_1 = require("../usecases/image.usecase");
exports.getRouter = (0, express_1.Router)();
exports.getRouter.get("/", async (_, res) => {
    try {
        const usecase = new image_usecase_1.ImageUsecase();
        const resultUseCase = await usecase.get();
        return res.status(201).json({ messege: resultUseCase });
    }
    catch (error) {
        res.json({ messege: "Fail in the aplications" });
        return console.log("Fail in the aplications", error);
    }
});
