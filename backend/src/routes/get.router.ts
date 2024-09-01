import { Router } from "express";
import { ImageUsecase } from "../usecases/image.usecase";
import { IError, IGetUser, IImageInterface } from "../interfaces/image.interface";
import { handleCodeErro } from "../middlewares/handleCodeErro";


export const getRouter = Router();

getRouter.get('/:customerCode/list', async (req, res)=>{

    const customerCode = req.params.customerCode;
    const query = req.query;

    const code:IGetUser = {
        customerCode,
        query,
    }
    
    try {

        const usecase = new ImageUsecase();
        const resultUseCase:IImageInterface = await usecase.get(code) as IImageInterface;

         if(!resultUseCase.id){
            const resultErros:IError = resultUseCase as unknown as IError;
            const erroCode:number= handleCodeErro(resultErros);

            return res.status(erroCode).json({messege: resultUseCase});
        }
        
        return res.status(200).json({messege: resultUseCase});

    } catch (error) {
        res.json({messege: "Fail in the aplications"});
        return console.log("Fail in the aplications", error);
    }
   
})
