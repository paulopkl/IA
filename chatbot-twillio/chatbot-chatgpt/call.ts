// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = '...';
const authToken = '...';
const client = twilio(accountSid, authToken);

const cellphone = "+5519983781727";

async function createCall() {
    const call = await client.calls.create({
        from: "+14843417199",
        to: cellphone,
        // url: "http://demo.twilio.com/docs/voice.xml",
        twiml: "<Response><Say>Ahoy, World!</Say></Response>",
    });

    console.log(call.sid);
}

createCall();
