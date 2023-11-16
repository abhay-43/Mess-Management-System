import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { sendMail, sendMailAdmin } from './modules/sendMail.mjs';
import { connectDB } from './modules/dbConnect.mjs';
import { insertSD, deleteSD, fetchSAD, fetchSD, changeSP, getAllStudents } from './modules/studentDB.mjs';
import { insertAD, deleteAD, fetchAAD, fetchAD, changeAP } from './modules/adminDB.mjs';
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


const Users = {};
//login router handler for students
app.post('/login', async function (req, res) {
  try{
    const {Reg_no, Password} = req.body;
    const pass = await fetchSD('password',Reg_no);
    const passwordMatch = bcrypt.compareSync(Password, pass);
    if(passwordMatch){
        // const role = await fetchSD('responsibility',Reg_no);
        const token = generateCookieToken(Reg_no);
        res.cookie('id',token,{httpOnly: true, maxAge : fourHoursInMilliseconds, sameSite: 'None', secure: true });
        Users[req.cookies.id] = {
          login : true
        }
        res.json({success : true, error : false}); 
    }else{
        res.json({success : false, error : false});
    }
  }catch(err){
    res.json({success : false, error : true});
    console.log(err);
  }
});

//login router handler for students
app.post('/adminlogin', async function (req, res) {
  try{
    const {Email, Password} = req.body;
    const pass = await fetchAD('password',Email);
    const passwordMatch = bcrypt.compareSync(Password, pass);
    if(passwordMatch){
        // const role = await fetchSD('responsibility',Reg_no);
        const token = generateCookieToken(Email);
        res.cookie('id',token,{httpOnly: true, maxAge : fourHoursInMilliseconds, sameSite: 'None', secure: true });
        Users[req.cookies.id] = {
          login : true
        }
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

app.post('/sendOTPadmin', async  function (req, res) {
  try{
    const {email} = req.body;
    const OTP = await sendMailAdmin(email);
    if(OTP === undefined) { //if reg no doesn't exist then value of OTP will be undefined
      res.send(false);
    } 
    forgetReqUser[email] = OTP;
    const token = generateCookieToken(email);
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
    const id = await decodeCookieToken(token);
    const otpMatch = (forgetReqUser[id] == OTP);
    if(otpMatch){
      if(!id.includes('@')) await changeSP(newPassword, id);
      else await changeAP(newPassword, id);
      delete forgetReqUser[id];
      res.json({success : true}); 
    }else{
      res.json({success : false}); 
    }
  }catch(err){
    console.log(err);
  }
});



app.get('/logout', async  function (req, res) {
  try{
    const id = req.cookies.id;
    delete Users[id];
    res.clearCookie('id');
    res.send(true);
  }catch(err){
    console.log(err);
  }
});

app.get('/studentData', async function (req, res) {
  try{
    const id = req.cookies.id;
    // if(Users[id] === undefined) res.send(false);
    //logic 
    const regno = await decodeCookieToken(id);
    const data = await fetchSAD(regno);
    res.send(data);
  }catch(err){
    console.log(err);
  }
});

app.get('/adminData', async function (req, res) {
  try{
    const id = req.cookies.id;
    const email = await decodeCookieToken(id);
    const data = await fetchAAD(email);
    res.send(data);
  }catch(err){
    console.log(err);
  }
});


//route to get all students data from a hostel 
app.post('/hostel', async  function (req, res) {
    try{
      // const { hostel } = req.body;
      const hostel = 'Tandon';
      const obj = await getAllStudents(hostel);
      res.send(obj);

    }catch(err){
      console.log(err);
    }
  });

  
app.get('/', async  function (req, res) {
    // const data = await insertAD('babujames0007@gmail.com','James', 'Bond', 'Tandon', '123456', 'Warden');
    // res.send(data);
    // const data = await getAllStudents('Malviya');
    // res.send(data);
    
});



app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
