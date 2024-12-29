import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function runAI() {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: "the brazillian president lula as a dwarf looking poor and living in poor neightboor, with bags of brazillian real spread on streets. focus on lula face, generate with high details quality",
        n: 1, // The number of images to generate. Must be between 1 and 10. Defaults to 1. For dall-e-3, only n=1 is supported
        size: "1024x1024",
        quality: "standard",
        style: "vivid", // Vivid causes the model to lean towards generating hyper-real and dramatic images. Natural causes the model to produce more natural, less hyper-real looking images. Defaults to ‘vivid
        response_format: "url", // ('url' or 'b64_json'): The format in which the generated images are returned. Must be one of "url" or "b64_json". Defaults to "url".
        user: "me"
    });

    console.log(response.data[0].url);
}

runAI();
