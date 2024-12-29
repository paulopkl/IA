import "dotenv/config";
import OpenAI from "openai";
// @ts-ignore ts(2307)
import { ChatCompletionMessageParam } from "openai/resources";
import fs from "node:fs/promises";
import { text } from "node:stream/consumers";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const filePath = "./me.jpg"

async function runAI() {
    const result = await fs.readFile(filePath);

    console.log(result.toString('base64'));

    // const messages: Array<ChatCompletionMessageParam> = [
    //     {
    //         role: "user",
    //         content: [
    //             { type: "text", text: "What's in this image?" },
    //             {
    //                 type: "image_url",
    //                 image_url: {
    //                     "url": `data:image/jpeg;base64,${result.toString("base64")}`,
    //                     "detail": "high"
    //                 },
    //             },
    //             { type: "text", text: "Could you estimate his age?" },
    //         ],
    //     }
    // ]

    // const response = await openai.chat.completions.create({
    //     model: "gpt-4o-mini",
    //     messages: messages,
    // },);

    // console.log(response.choices[0]);
}

runAI();
