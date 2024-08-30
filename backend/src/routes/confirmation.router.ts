import { Router } from "express";
import { IConfirmCreationData, IError } from "../interfaces/image.interface";
import { ImageUsecase } from "../usecases/image.usecase";
import { handleCodeErro } from "../middlewares/handleCodeErro";


export const confirmationRouter = Router();

confirmationRouter.patch("/confirm", async (req, res)=>{
    const data:IConfirmCreationData = req.body as IConfirmCreationData;

    try {
        const usecase = new ImageUsecase();
        const resultUseCase =  await usecase.patch(data);

        if(!resultUseCase.image_url){
            const resultErros:IError = resultUseCase as unknown as IError;
            const erroCode:number= handleCodeErro(resultErros);

            return res.status(erroCode).json({messege: resultUseCase});
        }

        return res.status(201).json({messege: resultUseCase});
        
    } catch (error) {
        res.json({messege: "Fail in the aplications"});
        return console.log("Fail in the aplications", error);
    }
})