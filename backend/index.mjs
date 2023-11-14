import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sendMail } from './modules/sendMail.mjs';
import { connectDB, insertSD, deleteSD, fetchSD, changeSP } from './modules/studentDB.mjs';
import { generateCookieToken, decodeCookieToken } from './modules/jwt.mjs';

const app = express();
const PORT = 5005;
const salt = bcrypt.genSaltSync(10);
const fourHoursInMilliseconds = 4 * 60 * 60 * 1000; // 4 hours in milliseconds


app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();


//login router handler for students
app.post('/login', async function (req, res) {
  try{
    const {Reg_no, Password} = req.body;
    const pass = await fetchSD('password',Reg_no);
    const passwordMatch = bcrypt.compareSync(Password, pass);
    if(passwordMatch){
        res.json({success : true, error : false}); 
    }else{
        res.json({success : false, error : false});
    }
  }catch(err){
    res.json({success : false, error : true});
    console.log(err);
  }
});

//request OTP router handler for students
const forgetReqUser = {};
app.post('/sendOTP', async  function (req, res) {
  try{
    const {Reg_no} = req.body;
    const OTP = await sendMail(Reg_no);
    if(OTP === undefined) { //if reg no doesn't exist then value of OTP will be undefined
      res.send(false);
    } 
    forgetReqUser[Reg_no] = OTP;
    const token = generateCookieToken(Reg_no);
    res.cookie('id',token,{httpOnly: true, maxAge : fourHoursInMilliseconds, sameSite: 'None', secure: true });
    res.send(true);
  }catch(err){
    console.log(err);
  }
});

//verify OTP and update student password in database
app.post('/verifyOTP', async  function (req, res) {
  try{
    const {newPassword, OTP} = req.body;
    const token = req.cookies.id;
    console.log(token);
    const Reg_no = await decodeCookieToken(token);
    const otpMatch = (forgetReqUser[Reg_no] == OTP);
    if(otpMatch){
      await changeSP(newPassword, Reg_no);
      delete forgetReqUser[Reg_no];
      res.json({success : true}); 
    }else{
      res.json({success : false}); 
    }
  }catch(err){
    console.log(err);
  }
});

app.get('/', async  function (req, res) {
    // const obj = await fetchSD('first_name','20214279');
    // const obj = await insertSD('20214006','Bhanu', 'Singh','Tandon','30042001');
    // res.send(obj);
    //
  });

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
