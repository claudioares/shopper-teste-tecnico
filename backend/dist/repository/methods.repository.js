"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRepositoryPrisma = void 0;
const prisma_config_1 = require("../db/prisma.config");
class ImageRepositoryPrisma {
    async get(params) {
        const resultPrisma = await prisma_config_1.prisma.measurement.findMany({
            where: params,
        });
        return resultPrisma;
    }
    async create(data) {
        const resultPrisma = await prisma_config_1.prisma.measurement.create({
            data: {
                image: data.image,
                customer_code: data.customer_code,
                measure_datetime: data.measure_datetime,
                measure_value: data.measure_value,
                measure_type: data.measure_type,
            }
        });
        return resultPrisma;
    }
    ;
    async patch(data) {
        const resultPrisma = await prisma_config_1.prisma.measurement.update({
            where: {
                id: data.measure_uuid
            },
            data: {
                measure_value: data.confirmed_value,
                isConfirmed: true
            }
        });
        return resultPrisma;
    }
    ;
    async deleteId(id) {
        const resultPrisma = await prisma_config_1.prisma.measurement.delete({
            where: {
                id
            }
        });
        return resultPrisma;
    }
    ;
    async checkInfoRecord(code) {
        const measuremente = await prisma_config_1.prisma.measurement.findUnique({
            where: {
                id: code
            }
        });
        return measuremente;
    }
}
exports.ImageRepositoryPrisma = ImageRepositoryPrisma;
