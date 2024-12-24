const axios = require("axios");
const FormData = require('form-data');

const downloadFile = async (url) => {
    const response = await axios.get(url, { responseType: 'stream' });
    return response.data;
};

exports.sendAudioForTranscription = async (gptToken, fileUrl) => {
    try {
        // Download the file
        const fileStream = await downloadFile(fileUrl);

        // Create a FormData instance
        const form = new FormData();
        form.append('file', fileStream, { filename: 'audio.mp3' });
        form.append('model', 'whisper-1');

        // Axios request configuration
        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${gptToken}`,
                'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
                ...form.getHeaders(), // Append FormData headers
            },
        };

        // Send the file for transcription
        const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', form, axiosConfig);

        return response.data;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};
