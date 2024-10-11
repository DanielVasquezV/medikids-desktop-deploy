import nodemailer from 'nodemailer';
import { config_env } from './dotenv_conf.js';

const SendEmail = async (options) => {
  // Crear el transportador
  const transporter = nodemailer.createTransport({
    host: config_env.EMAIL_HOST,
    port: config_env.EMAIL_PORT,
    secure: true,
    auth: {
      user: config_env.EMAIL_USERNAME,
      pass: config_env.EMAIL_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Error al verificar el transportador:", error);
        reject(error);
      } else {
        console.log("Servidor de correo listo para enviar mensajes");
        resolve(success);
      }
    });
  });

  const mailOptions = {
    from: config_env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error al enviar el correo:", err);
        reject(err);
      } else {
        console.log("Correo enviado con éxito:", info);
        resolve(info);
      }
    });
  });
};

export { SendEmail };