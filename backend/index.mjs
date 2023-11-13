import express from 'express';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sendMail } from './modules/sendMail.mjs';
import { connectDB, insertSD, deleteSD, fetchSD } from './modules/studentDB.mjs';

const app = express();
const PORT = 5005;
const salt = bcrypt.genSaltSync(10);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

// insertSD('20214197', 'Aamir', 'Siddiqui', 'Malviya', '18042003');
// deleteSD('20214197');
// fetchSD('first_name','20214279');

app.post('/login', async function (req, res) {
  const {Reg_no, Password} = req.body;
  try{
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

app.get('/', async  function (req, res) {
    const obj = await fetchSD('first_name','20214279');
    res.send(obj);
    //
  });
  
// sendMail('20214279');

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
