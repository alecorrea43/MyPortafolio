const { google } = require('googleapis');
require('dotenv').config();

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  
  // Configura el token de actualización (refresh token)
  oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

  try {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    const emailContent = `
      From: ${process.env.GMAIL_USER}
      To: ${process.env.TO_EMAIL}
      Subject: Nuevo mensaje de contacto

      Nombre: ${name}
      Correo Electrónico: ${email}
      Mensaje: ${message}
    `;

    const encodedMessage = Buffer.from(emailContent)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado con éxito', result: res.data }),
    };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al enviar el correo', error: error.message }),
    };
  }
};
