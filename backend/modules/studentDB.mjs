import pkg from 'pg';
import { DATABASE_URL } from '../config.mjs';


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

    export {
        connectDB,
        insertSD,
        deleteSD,
        fetchSD,
        createSE
    };