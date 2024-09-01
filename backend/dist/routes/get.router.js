"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRouter = void 0;
const express_1 = require("express");
const image_usecase_1 = require("../usecases/image.usecase");
const handleCodeErro_1 = require("../middlewares/handleCodeErro");
exports.getRouter = (0, express_1.Router)();
exports.getRouter.get('/:customerCode/list', async (req, res) => {
    const customerCode = req.params.customerCode;
    const query = req.query;
    const code = {
        customerCode,
        query,
    };
    try {
        const usecase = new image_usecase_1.ImageUsecase();
        const resultUseCase = await usecase.get(code);
        if (!resultUseCase.id) {
            const resultErros = resultUseCase;
            const erroCode = (0, handleCodeErro_1.handleCodeErro)(resultErros);
            return res.status(erroCode).json({ messege: resultUseCase });
        }
        return res.status(200).json({ messege: resultUseCase });
    }
    catch (error) {
        res.json({ messege: "Fail in the aplications" });
        return console.log("Fail in the aplications", error);
    }
});
