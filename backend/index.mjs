import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import { DATABASE_URL } from './config.mjs';

const app = express();
const PORT = 5000;
const salt = bcrypt.genSaltSync(10);
const { Client } = pkg;
const client = new Client({
  connectionString: DATABASE_URL,
});

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

// insertSD('20214279', 'Abhay', 'Vishwakarma', 'Tandon', '23072002');
// deleteSD('20214279');

app.get('/', function (req, res) {
  res.send("Your server is ready!");
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}...`);
});
