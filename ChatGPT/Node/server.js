import { Configuration, OpenAIApi } from "openai";
import "dotenv/config";

const apiKey = process.env.OPENAI_API_KEY;

const configuration = new Configuration({ apiKey });

const openai = new OpenAIApi(configuration);
// const response = await openai.listModels();
// console.log(response.data);

const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",    
    headers: [
        ["Content-Type", "application/json"],
        ["Authorization", `Bearer ${apiKey}`]
    ],
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": "Who is bolsonaro?"}],
        "temperature": 0.7
    })
})
    .then(async r => r.json())
    .then(async r => {
        console.log(r?.choices[0]?.message?.content);
    });

// console.log(res.body);
