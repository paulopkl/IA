import "dotenv/config";
import OpenAI from "openai";
// @ts-ignore ts(2307)
import { ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function runAI() {
    const messages: Array<ChatCompletionMessageParam> = [
        {
            role: "user",
            content: [
                { type: "text", text: "What's in this image?" },
                {
                    type: "image_url",
                    image_url: {
                        "url": "https://media.gazetadopovo.com.br/2023/06/16112331/bean-2.jpg",
                    },
                },
            ],
        }
    ]

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
    },);

    console.log(response.choices[0]);

}

runAI();
