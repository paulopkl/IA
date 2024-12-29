import "dotenv/config";
import OpenAI from "openai";
import fs from "node:fs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function runAI() {
    // const response = await openai.images.createVariation({
    //     model: "dall-e-2",
    //     image: fs.createReadStream("./me.png"),
    //     n: 1, // The number of images to generate. Must be between 1 and 10. Defaults to 1. For dall-e-3, only n=1 is supported
    //     size: "1024x1024",
    // });

    const response = await openai.images.edit({
        image: fs.createReadStream("me.png"),
        mask: fs.createReadStream("astronaut.png"),
        prompt: "make the guy wear an astronaut suit",
    });

    // console.log(response.data[0].url);
    console.log(response.data);
}

runAI();
