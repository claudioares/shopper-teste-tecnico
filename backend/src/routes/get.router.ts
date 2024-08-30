import { Router } from "express";
import { ImageUsecase } from "../usecases/image.usecase";


export const getRouter = Router();

getRouter.get("/", async (_, res)=>{

    try {
        const usecase = new ImageUsecase();
        const resultUseCase = await usecase.get();
        

        return res.status(201).json({messege: resultUseCase});

    } catch (error) {
        res.json({messege: "Fail in the aplications"});
        return console.log("Fail in the aplications", error);
    }
   
})
