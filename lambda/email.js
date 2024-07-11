const AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    const emailParams = {
        Destination: { ToAddresses: ['jevenegas1@utpl.edu.ec'] },
        Message: {
            Body: { Text: { Data: 'Mensaje de prueba' } },
            Subject: { Data: 'Asunto de prueba' }
        },
        Source: 'jvenegaq@gmail.com'
    };

    try {
        await ses.sendEmail(emailParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email enviado correctamente" })
        };
    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error al enviar el email", error })
        };
    }
};
