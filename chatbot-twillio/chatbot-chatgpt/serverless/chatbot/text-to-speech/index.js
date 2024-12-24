const AWS = require('aws-sdk');
// const fs = require('fs');

const axios = require("axios");

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' });

// const polly = new AWS.Polly();
const s3 = new AWS.S3();

const bucketName = 'chatbot-test-paulo'; // Replace with your S3 bucket name
const fileName = 'output.mp3'; // Name for the file in S3

exports.convertTextToSpeech = (gptToken, text) => {
    const url = "https://api.openai.com/v1/audio/speech";

    return axios.post(url, {
        "model": "tts-1",
        "input": text,
        "voice": "alloy"
    }, {
        headers: {
            "Authorization": `Bearer ${gptToken}`,
            "Content-Type": "application/json"
        },
        responseType: 'arraybuffer'
    }).then(res => res.data);
};

// exports.convertTextToSpeechUsingPolly = async (text) => {
//     const params = {
//         Text: text,
//         OutputFormat: 'mp3',
//         VoiceId: 'Vitoria',
//         Engine: "neural"
//     };

//     return new Promise((resolve, reject) => {
//         polly.synthesizeSpeech({ ...params }, (err, data) => {
//             if (err) {
//                 reject(err);
//             } else if (data.AudioStream instanceof Buffer) {
//                 resolve(data.AudioStream);

// //         fs.writeFile('output.mp3', data.AudioStream, (fsErr) => {
// //             if (fsErr) {
// //                 console.log(fsErr);
// //             } else {
// //                 console.log('Audio content written to file: output.mp3');
// //             }
// //         });

//             }
//         });
//     });
// }

exports.uploadToS3 = (audioStream) => {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: audioStream,
        ContentType: 'audio/mpeg',
        // ACL: 'public-read', // To make the file publicly accessible
    };

    return new Promise((resolve, reject) => {
        s3.upload({
            ...params
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location); // URL of the uploaded file
            }
        });
    });
};
