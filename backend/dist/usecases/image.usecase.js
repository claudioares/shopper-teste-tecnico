"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUsecase = void 0;
const zod_1 = require("zod");
const methods_repository_1 = require("../repository/methods.repository");
const checkReading_1 = require("../middlewares/checkReading");
const upload_1 = require("../middlewares/upload");
const createLinkImage_1 = require("../middlewares/createLinkImage");
class ImageUsecase {
    constructor() {
        this.repository = new methods_repository_1.ImageRepositoryPrisma();
    }
    ;
    async get() {
        const resultRepository = await this.repository.get();
        return resultRepository;
    }
    async create(data) {
        const measureTypeSchema = zod_1.z.enum(["WATER", "GAS"]);
        const resultMeasureType = measureTypeSchema.safeParse(data.measure_type);
        if (!resultMeasureType.success) {
            return {
                error_code: "INVALID_DATA",
                error_description: 'Please, choose "WATER" or "GAS"',
            };
        }
        const dateSchema = zod_1.z.string().refine((value) => {
            const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
            return dateRegex.test(value);
        }, {
            message: "Data deve estar no formato 'dd/mm/yyyy'",
        });
        const resultDateInput = dateSchema.safeParse(data.measure_datetime);
        if (!resultDateInput.success) {
            return {
                error_code: "INVALID_DATA",
                error_description: 'Please, correct the date!',
            };
        }
        const todayMonth = new Date();
        const currentMonth = todayMonth.getMonth() + 1;
        const TodayYear = new Date();
        const currentYear = TodayYear.getFullYear();
        const currentMonthMeasurement = Number(data.measure_datetime.split('/')[1]);
        const currentYearMeasurement = Number(data.measure_datetime.split('/')[2]);
        if (currentMonthMeasurement > currentMonth) {
            return ({
                error_code: "INVALID_DATA",
                error_description: 'Month invalid!',
            });
        }
        else if (currentYearMeasurement > currentYear) {
            return ({
                error_code: "INVALID_DATA",
                error_description: "Year invalid!"
            });
        }
        const createImageschema = zod_1.z.object({
            image: zod_1.z.string().min(1),
            customer_code: zod_1.z.string().min(1),
            measure_datetime: zod_1.z.string().min(1),
            measure_type: zod_1.z.string().min(1),
        });
        const parseResult = createImageschema.safeParse(data);
        if (!parseResult.success) {
            return ({
                error_code: "INVALID_DATA",
                error_description: 'The data provided in the body of the request is invalid!'
            });
        }
        const { image, customer_code, measure_datetime, measure_type } = parseResult.data;
        const resultCheckRecord = await (0, checkReading_1.checkMonthlyRecord)({ customer_code, measure_datetime, measure_type });
        if (resultCheckRecord) {
            return ({
                error_code: "DOUBLE_REPORT",
                error_description: "Leitura do mês já realizada"
            });
        }
        else {
            const responseUploadGemini = await (0, upload_1.uploadImageToGemini)(image);
            const measureNumber = Number(responseUploadGemini.measure.split(' ')[0]);
            const linkImage = await (0, createLinkImage_1.base64ToTempImage)(data.image);
            const dataRepository = {
                image: linkImage,
                customer_code,
                measure_datetime,
                measure_value: measureNumber,
                measure_type,
            };
            const resultRepository = await this.repository.create(dataRepository);
            const measureValue = resultRepository.measure_value;
            const resToRouter = {
                image_url: resultRepository.image,
                measure_value: measureValue,
                measure_uuid: resultRepository.id
            };
            return resToRouter;
        }
    }
    ;
    async patch(data) {
        const patchConfirmSchema = zod_1.z.object({
            measure_uuid: zod_1.z.string().min(1),
            confirmed_value: zod_1.z.number().int().min(1),
        });
        const parseResult = patchConfirmSchema.safeParse(data);
        if (!parseResult.success) {
            return {
                error_code: "INVALID_DATA",
                error_description: "The data provided in the body of the request is invalid!"
            };
        }
        ;
        const checkdCodeRepository = await this.repository.checkInfoRecord(data.measure_uuid);
        if (checkdCodeRepository === null) {
            return {
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Reading not found!"
            };
        }
        ;
        if (checkdCodeRepository.isConfirmed === true) {
            return {
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Leitura do mês já confirmada!"
            };
        }
        const resultRepositoryPatch = await this.repository.patch(data);
        if (resultRepositoryPatch.isConfirmed === true) {
            return {
                success: true
            };
        }
        ;
        return { error: "Application failed!" };
    }
    ;
    async deleteId(id) {
        if (!id)
            return {
                error_code: "INVALID_DATA",
                error_description: "Id not found!"
            };
        const checkdCode = await this.repository.checkInfoRecord(id);
        if (!checkdCode)
            return {
                error_code: "INVALID_DATA",
                error_description: "Id not found!"
            };
        const resultRepository = await this.repository.deleteId(id);
        if (resultRepository !== null) {
            return {
                id: resultRepository.id,
                menssege: "success deleted!"
            };
        }
        return resultRepository;
    }
}
exports.ImageUsecase = ImageUsecase;
