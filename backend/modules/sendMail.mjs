import nodemailer from 'nodemailer';
import { MAIL_KEY } from '../config.mjs';
import { createSE } from './studentDB.mjs';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mnnit.mms.2023@gmail.com',
      pass: MAIL_KEY,
    },
  });

  function generateMail(To,OTP){
    const mailOptions = {
      from: 'MNNIT Mess',
      to: To,
      subject: 'OTP Verification',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
        .center{
          text-align: center;
          align-items: center;
          align-self: center;
          align-content: center;
        }
        </style>
      </head>
      <body>
          <h2 class="center">OTP verification for forget Password</h2>
          <p>
          Please note that the <b>OTP</b> is valid for a limited time and should be used immediately to ensure successful verification. 
          In case you do not complete the verification within the specified time, you may need to request a new <b>OTP</b>.
          </p>
          <h2 class="center">${OTP}</h2>
          <p>
          If you have any questions or encounter any difficulties during the process, please do
           not hesitate to reach out to our support team at mnnit.mess.2023@gmail.com.
          </p>
      </body>
      </html>
       `,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  async function sendMail(Reg_no){
    try{
      const To = await createSE(Reg_no);
      let OTP = Math.floor((Math.random() * 999999));
      generateMail(To,OTP);
    }catch(err){
      console.log(err);
    }
  }

 export { sendMail };