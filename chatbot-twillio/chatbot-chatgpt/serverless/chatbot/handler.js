const serverless = require("serverless-http");
const express = require("express");
const app = express();
const textToSpeech = require("./text-to-speech/index");
const speechToText = require("./speech-to-text/index");

///////////////
// const VoiceResponse = require('twilio').twiml.VoiceResponse;
const twilio = require('twilio');

const accountSid = '...';
const authToken = '...';

const client = twilio(accountSid, authToken);

// const cellphone = "+5519983781727";
///////////////

///////////////
const chatgpt = require("./chatgpt/index");
///////////////


app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/callback", async (req, res, next) => {
  try {
    console.log("req.params:", req.params);
    console.log("req.header:", req.header);
    console.log("req.body:", req.body);

    const { To, From, Body, MessageType, MediaUrl0 } = req.body;

    // let message;
    if (MessageType == "audio") {
      userMessageText = await speechToText.sendAudioForTranscription(
        "sk-...",
        MediaUrl0
      );

      if (!userMessageText.text) {
        console.log({ userMessageText });
        userMessageText = {
          text: "responda para o humano: Não consigui entender o que você falou, tente novamente!"
        }
      }

      const responseGptText = await chatgpt.generateText(userMessageText.text);

      const textToConvert = responseGptText; // ""

      console.log({ textToSpeech });
      const audioStream = await textToSpeech.convertTextToSpeech(
        "sk-...",
        textToConvert
      );

      const fileUrl = await textToSpeech.uploadToS3(audioStream);

      console.log({ fileUrl });
      await client.messages.create({
        from: To,
        to: From,
        // mediaUrl: [
        //   // "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        //   fileUrl
        // ],
        mediaUrl: fileUrl,
      });

      // console.log(`Audio content written to S3: ${fileUrl}`);
    } else if (MessageType == "text") {
      const responseGptText = await chatgpt.generateText(Body);

      // const textToConvert = responseGptText; // ""

      console.log({ textToSpeech });

      // const audioStream = await textToSpeech.convertTextToSpeech(
      //   "sk-...",
      //   textToConvert
      // );

      // const fileUrl = await textToSpeech.uploadToS3(audioStream);

      // console.log(`Audio content written to S3: ${fileUrl}`);
      // console.log({ fileUrl });

      await client.messages.create({
        from: To,
        to: From,
        // mediaUrl: [
        //   // "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        //   fileUrl
        // ],
        // mediaUrl: fileUrl,
        body: responseGptText
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }

  // const response = new twilio.twiml.VoiceResponse();
  // response.say('Hello!');
  // console.log(response.toString());
  // return res.status(200).send(response.toString());

  return res.status(204);
});

// app.use((req, res, next) => {
//   return res.status(404).json({
//     error: "Not Found",
//   });
// });

exports.handler = serverless(app);
