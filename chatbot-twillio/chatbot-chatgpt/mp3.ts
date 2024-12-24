import axios from "axios";

import twilio from 'twilio';

const accountSid = '...';
const authToken = '...';
const client = twilio(accountSid, authToken);

const cellphone = "+5519983781727";

async function createMP3() {
    const message = await client.messages.create({
        from: "+14843417199",
        to: cellphone,
        mediaUrl: [
            "https://images.unsplash.com/photo-1545093149-618ce3bcf49d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
        ],
    }
    )

    console.log(message);
}

createMP3();