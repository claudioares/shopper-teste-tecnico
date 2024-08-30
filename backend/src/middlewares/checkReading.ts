import { prisma } from "../db/prisma.config";


type CheckReadingType = {
    measure_datetime: string,
    customer_code: string,
    measure_type: string
}

export async function checkMonthlyRecord({measure_datetime, customer_code, measure_type}:CheckReadingType):Promise<boolean | undefined> {

        const currentMeterMeasurement = Number(measure_datetime.split('/')[1]);

        const existingMeasurement = await prisma.measurement.findFirst({
            where: {
                measure_datetime,
                customer_code,
                measure_type
            }
        });

        if (existingMeasurement) {
            const monthString = measure_datetime.split('/')[1];
            const storedMeterMeasurement = parseInt(monthString, 10);

            if(currentMeterMeasurement === storedMeterMeasurement ) {
                return true;
            }
        };

        return false;
}