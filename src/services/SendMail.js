import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
 
async function createNewUser(to) {
  try {
    const config = await mailConfig();
 
     // Allow self-signed certificates
     config.tls = {
      rejectUnauthorized: false,
    };
    
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no MatrículaJá',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar sua conta.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para gerenciar sua conta.</p>`,
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}
async function sendContactEmail(from,type,message) {
  try {
    const config = await mailConfig();
 
     // Allow self-signed certificates
     config.tls = {
      rejectUnauthorized: false,
    };
    
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: from,
      to: "matrículajá@gmail.com",
      subject: `Email de ${type} recebido`,
      text: `${type}.\n\n${message}.`,
      html: `<h1>${type}.</h1><p>${message}.</p>`,
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

async function emailCode(to,code) {
  try {
    const config = await mailConfig();
 
     // Allow self-signed certificates
     config.tls = {
      rejectUnauthorized: false,
    };
    
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: "matrículajá@gmail.com",
      to: to,
      subject: `Código de verificação para troca de senha`,
      text: `Código de verificação.\n\n Esse é um código de verificação para você ${code}.`,
      html: `<h1>Código de verificação.</h1><p>${code}.</p>`,
    });
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}
export default { createNewUser, sendContactEmail, emailCode };
 