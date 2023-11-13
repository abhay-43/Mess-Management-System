import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import { DATABASE_URL, MAIL_KEY } from './config.mjs';
import cors from 'cors';

const app = express();
const PORT = 5000;
const salt = bcrypt.genSaltSync(10);
const { Client } = pkg;
const client = new Client({
  connectionString: DATABASE_URL,
});
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mnnit.mms.2023@gmail.com',
    pass: MAIL_KEY,
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectDB() {
  try {
    await client.connect();
    console.log("DB is connected!");
  } catch (err) {
    console.error(err);
  }
}

connectDB();


//function for inserting student data from database
async function insertSD(Reg_no, First_name, Last_name, Hostel, Password) {

  const select = `USE mms;`;
  try {
    const result = await client.query(select);
    console.log("Database mms selected !");
  } catch (err) {
    console.error(err);
  } 

  const query = `
    INSERT INTO students (Reg_no, First_name, Last_name, Hostel, Password)
    VALUES ($1, $2, $3, $4, $5)
  `;
  const pass = bcrypt.hashSync(Password,salt);
  try {
    const result = await client.query(query, [Reg_no, First_name, Last_name, Hostel, pass]);
    console.log("Data stored in student Table !");
  } catch (err) {
    console.error(err);
  }
}

//function for deleting student data from database
async function deleteSD(Reg_no) {

    const select = `USE mms;`;
    try {
      const result = await client.query(select);
      console.log("Database mms selected !");
    } catch (err) {
      console.error(err);
    } 
  
    const query = `DELETE FROM students WHERE Reg_no = $1 `;

    try {
      const result = await client.query(query, [Reg_no]);
      console.log(`Row Deleted with Reg.no. ${Reg_no} from student Table !`);
    } catch (err) {
      console.error(err);
    } finally {
      await client.end();
    }
  }

  //function for fetching student data from database
  async function fetchSD(Parameter, Reg_no) {

    const select = `USE mms;`;
    try {
      const result = await client.query(select);
      console.log("Database mms selected !");
    } catch (err) {
      console.error(err);
    } 
  
    const query = `SELECT ${Parameter} FROM students WHERE Reg_no = $1 `;

    try {
      const result = await client.query(query, [Reg_no]);
      return result.rows[0][Parameter];
    } catch (err) {
      console.error(err);
    } 
  }

  //generate student email 
  async function createSE(Reg_no){
    const name = await fetchSD('first_name', Reg_no);
    let email = `${name}.${Reg_no}` + '@mnnit.ac.in';
    return email;
  }

// insertSD('20214197', 'Aamir', 'Siddiqui', 'Malviya', '18042003');
// deleteSD('20214197');
// fetchSD('first_name','20214279');

app.post('/login', async function (req, res) {
  const {Reg_no, Password} = req.body;
  try{
    const pass = await fetchSD('password',Reg_no);
    const passwordMatch = bcrypt.compareSync(Password, pass);
    console.log(passwordMatch);
    if(passwordMatch){
        res.send(true);
    }else{
        res.send(false);
    }
  }catch(err){
    console.log(err);
  }
});

app.get('/', async  function (req, res) {
    const obj = await fetchSD('first_name','20214279');
    res.send(obj);
    //
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
// sendMail('20214197');




app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
