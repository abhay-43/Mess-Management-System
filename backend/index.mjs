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
import { uploadImg, upload} from './modules/cloudinary.mjs';
import { fetchMenu, insertMenu, changeMenu } from './modules/menuQuery.mjs';

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
        const token = generateCookieToken(Reg_no);
        res.cookie('id',token,{httpOnly: true, maxAge : fourHoursInMilliseconds, sameSite: 'None', secure: true });
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
        //  const role = await fetchSAD('responsibility',Reg_no);
        const token = generateCookieToken(Email);
        res.cookie('id',token,{httpOnly: true, maxAge : fourHoursInMilliseconds, sameSite: 'None', secure: true });
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


app.post('/upload', upload.single('image'),  async function (req, res) {
  try{
    const image = req.file.buffer;
    const {description, name, regNo, hostel} = req.body;
    // const result = await uploadImg(image);
    // console.log(result);
  }catch(err){
    console.log(err);
  }
});


app.get('/logout', async  function (req, res) {
  try{
    const id = req.cookies.id;
    res.clearCookie('id');
    res.send(true);
  }catch(err){
    console.log(err);
  }
});

app.get('/studentData', async function (req, res) {
  try{
    const id = req.cookies.id;
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
      const { hostel } = req.body;
      const obj = await getAllStudents(hostel);
      res.send(obj);

    }catch(err){
      console.log(err);
    }
  });

  //route to fetch mess menu
app.post('/menu', async  function (req, res) {
  try{
    const { hostel } = req.body;
    const link = await fetchMenu(hostel);
    res.send({
      link : link
    });
  }catch(err){
    console.log(err);
  }
});

  //route to store students data into database 
app.post('/addStudents', async  function (req, res) {
  const token = req.cookies.id;
  const id = await decodeCookieToken(token);
  if(id.includes('@')){
    try{
      const { regNo, firstName, lastName, hostel, password, responsibility } = req.body;
      await insertSD(regNo, firstName, lastName, hostel, password, responsibility);
      res.json({success : true}); 
    }catch(err){
      res.json({success : false}); 
      console.log(err);
    }
  }
});

  //route to delete students data from database 
  app.post('/delStudents', async  function (req, res) {
    const token = req.cookies.id;
    const id = await decodeCookieToken(token);
    if(id.includes('@')){
      try{
        const { regNo } = req.body;
        await deleteSD(regNo);
        res.json({success : true}); 
      }catch(err){
        res.json({success : false}); 
        console.log(err);
      }
    }
  });

  //route to handle chnage password 
  app.post('/changePass', async  function (req, res) {
    const token = req.cookies.id;
    const id = await decodeCookieToken(token);
    try{
      const {old_password, new_password} = req.body;
      if(id.includes('@')){
        const pass = await fetchAD('password',id);
        const passwordMatch = bcrypt.compareSync(old_password,pass);
        if(passwordMatch){
          await changeAP(new_password,id);
          return res.send({ auth: true, message: 'Password changed successfully!'});
        }else{
          return res.send({ auth: false, message: 'Password does not match..' })
        }
      }else{
        const pass = await fetchSD('password',id);
        const passwordMatch = bcrypt.compareSync(old_password,pass);
        if(passwordMatch){
          await changeSP(new_password,id);
          res.send({ auth: true, message: 'Password changed successfully!'});
        }else{
          res.send({ auth: false, message: 'Password does not match..' })
        }
      }
    }catch(err){
      res.send({ auth: false, message: 'Unknown error occured! Try again...' })
      console.log(err);
    }
    
  });

  
app.get('/', async  function (req, res) {
    // const data = await insertAD('babujames0007@gmail.com','James', 'Bond', 'Tandon', '123456', 'Warden');
    // res.send(data);
    // const data = await getAllStudents('Malviya');
    // res.send(data);
    // await deleteSD('');
    // await changeMenu('Tandon','https://res.cloudinary.com/dbhvnmb2o/image/upload/v1700341131/uploads/ay6u9z0twuj0lrs6vrnf.jpg');
    // const data = await fetchMenu('Tandon');
    // res.send(data);
    
});



app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
