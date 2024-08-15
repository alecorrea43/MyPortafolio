const { google } = require('googleapis');


// Configuración del cliente OAuth2
const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

// Ruta para obtener el URL de autorización
exports.getAuthUrl = async function(event, context) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.send'],
    redirect_uri: process.env.GMAIL_REDIRECT_URI
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ authUrl }),
  };
};

// Ruta para intercambiar el código de autorización por tokens
exports.getToken = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { code } = JSON.parse(event.body);

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    // Aquí puedes guardar los tokens en una base de datos o en el entorno
    oAuth2Client.setCredentials(tokens);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Tokens obtenidos con éxito', tokens }),
    };
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al obtener el token', error: error.message }),
    };
  }
};

// Ruta para enviar el correo
exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Configuración del cliente OAuth2 con el token de acceso
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    process.env.GMAIL_REDIRECT_URI
  );
  
  oAuth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

  // Crear el cuerpo del mensaje en base64
  const rawMessage = makeBody(
    process.env.TO_EMAIL,
    email,
    'Nuevo mensaje de contacto',
    `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`
  );

  try {
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Correo enviado con éxito', info: response.data }),
    };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error al enviar el correo', error: error.message }),
    };
  }
};

// Función para codificar el mensaje en base64
function makeBody(to, from, subject, message) {
  const str = [
    `To: ${to}`,
    `From: ${from}`,
    `Subject: ${subject}`,
    '',
    message,
  ].join('\n');

  return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}
