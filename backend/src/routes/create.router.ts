import { Router } from "express";
import { ImageUsecase } from "../usecases/image.usecase";
import { IError, IImageCreate } from "../interfaces/image.interface";
import { handleCodeErro } from "../middlewares/handleCodeErro";

export const createRouter = Router();

type ResponseUploadGeminiType = {
    image_url: string,
    measure_value: number,
    measure_uuid: string
}


createRouter.post("/upload", async(req, res)=>{
    
    const data:IImageCreate = req.body as IImageCreate;


    try {
        const usecase = new ImageUsecase();
        const resultUseCase:ResponseUploadGeminiType = await usecase.create(data) as ResponseUploadGeminiType;
        
        if(!resultUseCase.image_url){
            const resultErros:IError = resultUseCase as unknown as IError;
            const erroCode:number= handleCodeErro(resultErros);

            return res.status(erroCode).json({messege: resultUseCase});
        }
        
        return res.status(200).json({messege: resultUseCase});
        
    } catch (error) {
        res.json({messege: "Fail in the aplications", error});
        return console.log("Fail in the aplications", error);
    }
})