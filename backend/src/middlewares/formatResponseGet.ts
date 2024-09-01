import { IImageInterface } from "../interfaces/image.interface";


export function formatResponseGet (data: { resultUseCase:any[] }) {
    return {
        customer_code: data.resultUseCase[0].customer_code,
        measures: data.resultUseCase.map(item => ({
            measure_uuid: item.id,
            measure_datetime: item.measure_datetime,
            measure_type: item.measure_type,
            has_confirmed: item.isConfirmed
        }))
    };
};