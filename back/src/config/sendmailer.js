import nodemailer from 'nodemailer'
import path from "path"
import dotenv from "dotenv"
import { fileURLToPath } from 'url';
import generatetoken from "../middelwares/generatetoken.js";
import Codemodel from "../models/code.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../a.env') });

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
});
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to send messages');
  }
});
const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Email Verification</h1>
      <a href="http://localhost:5000/api/auth/verify/${code}"><p>Your verification link</p></a>
      <p>This code will expire in 24 hours.</p>
    `
  };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
};
export default sendVerificationEmail;