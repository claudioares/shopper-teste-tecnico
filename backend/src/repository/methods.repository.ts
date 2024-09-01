import { prisma } from "../db/prisma.config";
import { IConfirmCreationData, IGetUser, IImageCreate, IImageInterface, IMethodsRepositoryImage } from "../interfaces/image.interface";

export class ImageRepositoryPrisma implements IMethodsRepositoryImage {
  
    async get(params:any): Promise<IImageInterface[]> {
    const resultPrisma = await prisma.measurement.findMany({
      where: params,
    });

        return resultPrisma;
    }
    async create(data: IImageCreate): Promise<IImageInterface> {
        const resultPrisma = await prisma.measurement.create({
            data: {
                image:data.image,
                customer_code:data.customer_code,
                measure_datetime:data.measure_datetime,
                measure_value: data.measure_value,
                measure_type:data.measure_type,
            }
        });
        
        return resultPrisma;
    };

    async patch(data: IConfirmCreationData): Promise<IImageInterface> {
        const resultPrisma = await prisma.measurement.update({
            where:{
                id: data.measure_uuid
            },
            data:{
                measure_value:data.confirmed_value,
                isConfirmed: true
            }
        });

        return resultPrisma;
    };

    async deleteId(id: string): Promise<IImageInterface> {
        const resultPrisma = await prisma.measurement.delete({
            where:{
                id
            }
        });

        return resultPrisma;
    };

    async checkInfoRecord (code:string): Promise<IImageInterface | null> {
        const measuremente = await prisma.measurement.findUnique({
            where: {
                id:code
            }
        });

        return measuremente;
    }
}