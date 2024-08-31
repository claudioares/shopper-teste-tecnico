"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRouter = void 0;
const express_1 = require("express");
const image_usecase_1 = require("../usecases/image.usecase");
const handleCodeErro_1 = require("../middlewares/handleCodeErro");
exports.createRouter = (0, express_1.Router)();
exports.createRouter.post("/upload", async (req, res) => {
    const data = req.body;
    try {
        const usecase = new image_usecase_1.ImageUsecase();
        const resultUseCase = await usecase.create(data);
        if (!resultUseCase.image_url) {
            const resultErros = resultUseCase;
            const erroCode = (0, handleCodeErro_1.handleCodeErro)(resultErros);
            return res.status(erroCode).json({ messege: resultUseCase });
        }
        return res.status(200).json({ messege: resultUseCase });
    }
    catch (error) {
        res.json({ messege: "Fail in the aplications", error });
        return console.log("Fail in the aplications", error);
    }
});
