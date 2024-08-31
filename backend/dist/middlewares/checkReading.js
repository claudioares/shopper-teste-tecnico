"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMonthlyRecord = checkMonthlyRecord;
const prisma_config_1 = require("../db/prisma.config");
async function checkMonthlyRecord({ measure_datetime, customer_code, measure_type }) {
    const currentMeterMeasurement = Number(measure_datetime.split('/')[1]);
    const existingMeasurement = await prisma_config_1.prisma.measurement.findFirst({
        where: {
            measure_datetime,
            customer_code,
            measure_type
        }
    });
    if (existingMeasurement) {
        const monthString = measure_datetime.split('/')[1];
        const storedMeterMeasurement = parseInt(monthString, 10);
        if (currentMeterMeasurement === storedMeterMeasurement) {
            return true;
        }
    }
    ;
    return false;
}
