import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import { DATABASE_URL } from './config.mjs';
import cors from 'cors';

const app = express();
const PORT = 5000;
const salt = bcrypt.genSaltSync(10);
const { Client } = pkg;
const client = new Client({
  connectionString: DATABASE_URL,
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
  } finally {
    await client.end();
  }
}

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
  
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
