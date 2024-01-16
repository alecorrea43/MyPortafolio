const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'true', // Permitir solicitudes desde cualquier origen (en entorno local)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilitar credenciales (cookies, encabezados, etc.)
  };
  
  app.use(cors(corsOptions));
  
  
app.use(bodyParser.json());

// Configuración del transporte de nodemailer con SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.TO_EMAIL,
    subject: 'Nuevo mensaje de contacto',
    text: `Nombre: ${name}\nCorreo Electrónico: ${email}\nMensaje: ${message}`,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        return res.status(500).json({ message: 'Error al enviar el correo', error: error.message });
      }
      res.status(200).json({ message: 'Correo enviado con éxito', info: info.response });
    });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ message: 'Error general', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
