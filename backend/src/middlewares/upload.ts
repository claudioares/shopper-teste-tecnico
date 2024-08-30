// Make sure to include these imports:
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function uploadImageToGemini (imageBase64:string) {
    const envKey = process.env.GEMINI_API_KEY;

    if (!envKey) throw new Error('MY_ENV_VAR is not defined');

    const fileManager = new GoogleAIFileManager(envKey);

    var imageBuffer = Buffer.from(imageBase64,'base64');
    const filePath = '/tmp/jetpack.jpg';

    require('fs').writeFileSync(filePath, imageBuffer);

    const uploadResult = await fileManager.uploadFile(
    filePath,
    {
        mimeType: "image/jpeg",
    },
    );


    type GetResponseType = {
        name: string,
        mimeType: string,
        sizeBytes: string,
        createTime: string,
        updateTime: string,
        expirationTime: string,
        sha256Hash: string,
        uri: string,
        state: string
    }

    const getResponse:GetResponseType = await fileManager.getFile(uploadResult.file.name);

    const prompt = `
        If the image is of a water or light meter, just send me the measurement numbers.
    `
    const genAI = new GoogleGenerativeAI(envKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
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
    }
}

