"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64ToTempImage = base64ToTempImage;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const util_1 = require("util");
const writeFileAsync = (0, util_1.promisify)(fs_1.default.writeFile);
const accessAsync = (0, util_1.promisify)(fs_1.default.access);
async function ensureCacheDirectoryExists(directory) {
    try {
        await accessAsync(directory);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            fs_1.default.mkdirSync(directory, { recursive: true });
        }
        else {
            throw error;
        }
    }
}
async function base64ToTempImage(base64Image) {
    const cacheDirectory = path_1.default.join(__dirname, 'cache');
    await ensureCacheDirectoryExists(cacheDirectory);
    const base64Data = base64Image.replace(/^data:image\/jpeg;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const fileName = `${(0, uuid_1.v4)()}.jpg`;
    const filePath = path_1.default.join(cacheDirectory, fileName);
    await writeFileAsync(filePath, imageBuffer);
    const tempLink = `http://localhost:3000/cache/${fileName}`;
    return tempLink;
}
