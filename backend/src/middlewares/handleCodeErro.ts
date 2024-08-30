import { IError } from "../interfaces/image.interface";


export function handleCodeErro(data:IError):number{

    if(data.error_code === "INVALID_DATA"){
        return 400;
    }
    
    if(data.error_code === "DOUBLE_REPORT" || data.error_code === "CONFIRMATION_DUPLICATE"){
        return 409;
    } 

    if(data.error_code === "MEASURE_NOT_FOUND"){
        return 404;
    }

    return 200
}