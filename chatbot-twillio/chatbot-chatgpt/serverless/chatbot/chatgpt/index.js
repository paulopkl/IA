///////////////
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: "sk-...",
});
///////////////

exports.generateText = async (prompt) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o", // or "gpt-4-turbo"
        messages: [
            {
                role: "system",
                content: "Você é nina uma assistente humana. Que responde de forma entusiasmada como se fosse uma pessoa. pontue suas frases com virgulas e pontos como em uma frase dita por humanos",
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    console.log({ response });

    return response.choices[0].message.content;
};
