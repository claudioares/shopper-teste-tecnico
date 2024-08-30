import { Router } from "express";
import { ImageUsecase } from "../usecases/image.usecase";
import { IError } from "../interfaces/image.interface";
import { handleCodeErro } from "../middlewares/handleCodeErro";


export const deletIdRouter = Router();

type DeleteResponseType = {
    id:string,
    menssege:string
}

deletIdRouter.delete("/deleteid", async (req, res)=>{

    const { id }:{id:string} = req.body;
    try {
        const usecase = new ImageUsecase();
        const resultUseCase:DeleteResponseType = await usecase.deleteId(id) as DeleteResponseType;

        if(!resultUseCase.menssege){
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
