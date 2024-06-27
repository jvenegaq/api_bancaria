const AWS = require('aws-sdk');
const ses = new AWS.SES();

const sendEmail = async (subject, message) => {
    const emailParams = {
        Destination: { ToAddresses: ['jevenegas1@utpl.edu.ec'] },
        Message: {
            Body: { Text: { Data: message } },
            Subject: { Data: subject }
        },
        Source: 'jvenegaq@gmail.com'
    };

    try {
        await ses.sendEmail(emailParams).promise();
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

module.exports = { sendEmail };
