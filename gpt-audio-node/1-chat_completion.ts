import "dotenv/config";
import OpenAI from "openai";
import fs from "node:fs/promises";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function runAI() {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        { role: "developer", content: "You are a helpful assistant." },
        // {
        //     role: "user",
        //     content: "i am interest on kubernetes.",
        // },
        // {
        //     role: "user",
        //     content: "show me use cases of using harbor on kubernetes.",
        // }
        {
            role: "user",
            content: "how to install harbor within a kubernetes cluster"
        }
    ]


    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages,
    });

    const output = completion.choices[0].message.content;

    console.log({output});

    const completionFileName = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            ...messages,
            {
                role: completion.choices[0].message.role,
                content: completion.choices[0].message.content
            },
            {
                role: "user",
                content: "now resume your last prompt into a max three words filename (if contain space, every space should be fill with \"-\"), with extension .md"
            }
        ],
    });

    try {
        // const filename = "./text-completion-output";
        // const extension = "md";
        // const file = filename.concat(".").concat(extension);
        const file = completionFileName.choices[0].message.content?.replace("`", "").replace(" ", "");

        await fs.writeFile("outputs/" + file, output!.toString());

        console.log(`File "${file}" has been written successfully.`)
    } catch (error) {
        console.error(error);
    }
}

runAI();
