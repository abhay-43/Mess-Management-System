import { client } from "./dbConnect.mjs";
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);


//function for inserting student data from database
async function insertSD(Reg_no, First_name, Last_name, Hostel, Password, responsibility) {

    const select = `USE mms;`;
    try {
      const result = await client.query(select);
      console.log("Database mms selected !");
    } catch (err) {
      console.error(err);
    } 
  
    const query = `
      INSERT INTO students (Reg_no, First_name, Last_name, Hostel, Password, responsibility)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
      const pass = bcrypt.hashSync(Password,salt);
      const result = await client.query(query, [Reg_no, First_name, Last_name, Hostel, pass, responsibility]);
      console.log("Data stored in student Table !");
    } catch (err) {
      throw new DatabaseError("DATABASE ERROR :");
      
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
      }
    }

    //function for fetching student data from database
    async function fetchSAD(Reg_no) {
  
      const select = `USE mms;`;
      try {
        const result = await client.query(select);
        console.log("Database mms selected !");
      } catch (err) {
        console.error(err);
      } 
    
      const query = `SELECT reg_no, first_name, last_name, hostel, responsibility FROM students WHERE Reg_no = $1 `;
  
      try {
        const result = await client.query(query, [Reg_no]);
        const data = {
          reg_no : result.rows[0].reg_no,
          first_name : result.rows[0].first_name,
          last_name : result.rows[0].last_name,
          hostel : result.rows[0].hostel,
          responsibility : result.rows[0].responsibility
        };
        return data;
      } catch (err) {
        console.log(err);
      } 
    }
  
    //function for fetching student data from database with parameter
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
        throw new DatabaseError("DATABASE ERROR :");
      } 
    }

    //function for updating student password into database
    async function changeSP(password, Reg_no) {
  
      const select = `USE mms;`;
      try {
        const result = await client.query(select);
        console.log("Database mms selected !");
      } catch (err) {
        console.error(err);
      } 
    
      const query = `UPDATE students SET password = $1 WHERE Reg_no = $2`;
  
      try {
        const pass = bcrypt.hashSync(password,salt);
        const result = await client.query(query, [pass,Reg_no]);
        console.log(`Password updated of Reg.no. ${Reg_no}...`);
      } catch (err) {
        console.error(err);
      } 
    }

    //get all student details from hostel
    async function getAllStudents(hostel) {
  
      const select = `USE mms;`;
      try {
        const result = await client.query(select);
        console.log("Database mms selected !");
      } catch (err) {
        console.error(err);
      } 
    
      const query = `SELECT reg_no, first_name, last_name, responsibility FROM students WHERE hostel = $1 `;
  
      try {
        const result = await client.query(query, [hostel]);
        return result.rows;
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
        insertSD,
        deleteSD,
        fetchSAD,
        fetchSD,
        createSE,
        changeSP,
        getAllStudents
    };