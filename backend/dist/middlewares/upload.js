"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageToGemini = uploadImageToGemini;
// Make sure to include these imports:
const server_1 = require("@google/generative-ai/server");
const generative_ai_1 = require("@google/generative-ai");
async function uploadImageToGemini(imageBase64) {
    const envKey = process.env.GEMINI_API_KEY;
    if (!envKey)
        throw new Error('MY_ENV_VAR is not defined');
    const fileManager = new server_1.GoogleAIFileManager(envKey);
    var imageBuffer = Buffer.from(imageBase64, 'base64');
    const filePath = '/tmp/jetpack.jpg';
    require('fs').writeFileSync(filePath, imageBuffer);
    const uploadResult = await fileManager.uploadFile(filePath, {
        mimeType: "image/jpeg",
    });
    const getResponse = await fileManager.getFile(uploadResult.file.name);
    const prompt = `
        If the image is of a water or light meter, just send me the measurement numbers.
    `;
    const genAI = new generative_ai_1.GoogleGenerativeAI(envKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
        prompt,
        {
            fileData: {
                fileUri: uploadResult.file.uri,
                mimeType: uploadResult.file.mimeType,
            },
        },
    ]);
    return {
        measure: result.response.text(),
        linkImage: getResponse.uri
    };
}
