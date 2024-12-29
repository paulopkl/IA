import "dotenv/config";
import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const fileFineTuningName = "style-and-tone-fine-tuning.jsonl";
let trainingFileId = "";

async function uploadFineTuningFile() {
    const filesList = await openai.files.list({});

    const fileNames: string[] = [];

    for await (const file of filesList) {
        fileNames.push(file.filename);
        if (file.filename == fileFineTuningName) {
            trainingFileId = file.id;
        }
    }

    if (fileNames.includes(fileFineTuningName)) {
        return console.warn(`File ${fileFineTuningName} already exists!`);
    }

    const fileTuningLocation = path.join(__dirname, "types-of-fine-tuning", fileFineTuningName);

    const fileStreamData = fs.createReadStream(fileTuningLocation);

    const file = await openai.files.create({
        file: fileStreamData,
        purpose: "fine-tune",
    });

    console.log({ file }); // file-DrSMu69RUHyWtooWisTusD

    trainingFileId = file.id;
}

async function fineTune() {
    const jobFineTunning = await openai.fineTuning.jobs.create({
        model: "gpt-4o-mini-2024-07-18", // gpt-4o-2024-08-06
        training_file: trainingFileId,

        // Suitable for GPT-4 or GPT-3.5-turbo
        // method: {
        //     type: "dpo",
        //     dpo: {
        //         hyperparameters: { beta: 0.1 }
        //     }
        // }
        hyperparameters: {
            n_epochs: "auto",
            batch_size: "auto",
            learning_rate_multiplier: "auto"
        },
        integrations: []
    });

    console.log({ jobFineTunning });
}

async function listFineTuningJobs() {
    // List 10 fine-tuning jobs
    let page = await openai.fineTuning.jobs.list({ limit: 10 });

    console.log(page.data);
}

async function retrieveSpecificFineTuneJob(jobId: string): Promise<string> {
    // Retrieve the state of a fine-tune
    let fineTune = await openai.fineTuning.jobs.retrieve(jobId);

    console.log({ fineTune });

    console.log(`Finished at: ${new Date(fineTune.finished_at as number * 1000)}`);

    return fineTune.fine_tuned_model as string
}

async function CancelAFineTuningJob() {
    let jobId = "ftjob-3u6ec242HN5JhO63dtx4y0F9";

    // Cancel a job
    let status = await openai.fineTuning.jobs.cancel(jobId);
}

async function listEventsFromFineTuningJob() {
    let jobId = "ftjob-3u6ec242HN5JhO63dtx4y0F9";

    // List up to 10 events from a fine-tuning job
    let events = await openai.fineTuning.jobs.listEvents(jobId, {
        limit: 10
    });

    // console.log(events);
    console.log(events.data);
}

async function listCheckpointsFromJob() {
    let jobId = "ftjob-3u6ec242HN5JhO63dtx4y0F9";

    const checkpoints = await openai.fineTuning.jobs.checkpoints.list(jobId);

    console.log(checkpoints);
}

async function listAvailableModels() {
    const list = await openai.models.list();

    for await (const model of list) {
        console.log(model);
    }
}

async function testingFineTunedModel(fineTunedModel: string = "gpt-4o") {

    // { role: "developer", content: "You are a helpful assistant." },
    // {
    //     role: "user",
    //     content: "i am interest on kubernetes.",
    // },
    // {
    //     role: "user",
    //     content: "show me use cases of using harbor on kubernetes.",
    // }
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: "Marv is a factual chatbot that is also sarcastic"
        },
        {
            role: "user",
            content: "What is the biggest country in the world?"
        }
    ];

    const completionFineTuned = await openai.chat.completions.create({
        model: fineTunedModel,
        messages: [
            ...messages,
            //         {
            //             role: completion.choices[0].message.role,
            //             content: completion.choices[0].message.content
            //         },
            //         {
            //             role: "user",
            //             content: "now resume your last prompt into a max three words filename (if contain space, every space should be fill with \"-\"), with extension .md"
            //         }
        ],
    });

    console.log(completionFineTuned.choices[0]);
}

// async function deleteAModel() {
//     // Delete a fine-tuned model
//     let model = await openai.models.del(
//         'ft:gpt-4o-mini-2024-07-18:personal::AiutdbDR:ckpt-step-90'
//     );

//     console.log({ model });
// }

async function main() {
    let jobId = "ftjob-3u6ec242HN5JhO63dtx4y0F9";
    let fineTunedModel = "ft:gpt-4o-mini-2024-07-18:personal::AjZ7lvGu";

    // await listFineTuningJobs();

    // await uploadFineTuningFile();

    // await fineTune();
 
    // await listFineTuningJobs();

    // List
    // fineTunedModel = await retrieveSpecificFineTuneJob(jobId);

    // List Events
    // await listEventsFromFineTuningJob();

    // List Checkpoints model
    // await listCheckpointsFromJob();

    // Text Chat completion Fine Tuned model
    await testingFineTunedModel(fineTunedModel);

    // await listAvailableModels();

    // await deleteAModel();
}

main();
