// import nodemailer from 'nodemailer';
// import { config_env } from './dotenv_conf.js';

// const SendEmail = (options) => {
//   // SET THE CONFIG TO THE TRANSPORT THE EMAIL
//   const transporter = nodemailer.createTransport({
//       host: config_env.EMAIL_HOST,
//       port: config_env.EMAIL_PORT,
//       secure: true,
//       auth: {
//         user: config_env.EMAIL_USERNAME,
//         pass: config_env.EMAIL_PASSWORD
//       }
//     });
  
//     // SET THE ELEMENTS OF THE EMAIL
//     const mailOptions = {
//       from: config_env.EMAIL_FROM,
//       to: options.to,
//       subject: options.subject,
//       html: options.text
//     }
  
//     // FUNCTION TO SEND THE EMAIL AND GET BACK THE INFO
//     transporter.sendMail(mailOptions, function (err, info) {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(info)
//       }
//     })
// } 

// export { SendEmail };

import sgMail from '@sendgrid/mail';
import { config_env } from './dotenv_conf.js';

sgMail.setApiKey(config_env.SENDGRID_API_KEY);

const SendEmail = async (options) => {
  const msg = {
    to: options.to,
    from: config_env.EMAIL_FROMSG,
    subject: options.subject,
    html: options.text,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Correo enviado con éxito:', response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

export { SendEmail };