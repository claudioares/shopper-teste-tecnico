"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletIdRouter = void 0;
const express_1 = require("express");
const image_usecase_1 = require("../usecases/image.usecase");
const handleCodeErro_1 = require("../middlewares/handleCodeErro");
exports.deletIdRouter = (0, express_1.Router)();
exports.deletIdRouter.delete("/deleteid", async (req, res) => {
    const { id } = req.body;
    try {
        const usecase = new image_usecase_1.ImageUsecase();
        const resultUseCase = await usecase.deleteId(id);
        if (!resultUseCase.menssege) {
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
