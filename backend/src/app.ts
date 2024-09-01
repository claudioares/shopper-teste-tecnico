import express, { Application } from "express";
import cors from "cors"
import { createRouter } from "./routes/create.router";
import { confirmationRouter } from "./routes/confirmation.router";
import { getRouter } from "./routes/get.router";
import { deletIdRouter } from "./routes/deleteId.router";


export class App {

    private app:Application;
    constructor(){
        this.app = express();
    };

    listen(){
        const PORT= 3333;

        this.app.listen(PORT, ()=>{
            console.log(`Server running in the port ${PORT}!!`)
        })
    };

    register(){
        this.app.use(cors());
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({extended: true }));

        this.app.use(createRouter);
        this.app.use(confirmationRouter);
        this.app.use(getRouter);
        this.app.use(deletIdRouter);
    }
}