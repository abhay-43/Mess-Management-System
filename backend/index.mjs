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

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// insertSD('20214197', 'Aamir', 'Siddiqui', 'Malviya', '18042003');
// deleteSD('20214197');
// fetchSD('first_name','20214279');

app.post('/login', async function (req, res) {
  try{
    const {Reg_no, Password} = req.body;
    const pass = await fetchSD('password',Reg_no);
    const passwordMatch = bcrypt.compareSync(Password, pass);
    if(passwordMatch){
        res.json({success : true}); 
    }else{
        res.json({success : false});
    }
  }catch(err){
    console.log(err);
  }
});

const forgetReqUser = {};
app.post('/sendOTP', async  function (req, res) {
  try{
    const {Reg_no} = req.body;
    const OTP = await sendMail(Reg_no);
    forgetReqUser[Reg_no] = OTP;
    const token = generateCookieToken(Reg_no);
    res.cookie('id',token,{httpOnly : true, maxAge : fourHoursInMilliseconds});
  }catch(err){
    console.log(err);
  }
});

app.post('/verifyOTP', async  function (req, res) {
  try{
    const {newPassword, OTP} = req.body;
    const token = req.cookies.id;
    const Reg_no = decodeCookieToken(token);
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
    const obj = await fetchSD('first_name','20214279');
    res.send(obj);
    //
  });
  
// sendMail('20214279');

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
