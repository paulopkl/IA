const accountSid = '...';
const authToken = '...';

import axios from "axios";

// import client from 'twilio';

// const twilioClient = client(accountSid, authToken);

// twilioClient.messages
//     .create({
//         body: 'Your appointment is coming up on July 21 at 3PM',
//         from: 'whatsapp:+14155238886',
//         to: 'whatsapp:+5519983781727'
//     })
//     .then((message: any) => console.log(message.sid))
// .done();

async function main() {
    const params = new URLSearchParams();

    const cellphone = "+5519983781727";
    // const cellphone = "+5519981395613";

    params.append('To', `whatsapp:${cellphone}`);
    params.append('From', 'whatsapp:+14155238886');
    params.append('Body', 'Não esqueça de comprar um presente para seu filho Paulo!');

    const result = await axios.post(
        `https://api.twilio.com/2010-04-01/Accounts/<Account key>/Messages.json`,
        params,
        {
            auth: {
                username: accountSid,
                password: authToken
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    console.log(result.data);
};

main();
