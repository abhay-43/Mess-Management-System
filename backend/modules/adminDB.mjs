import { client } from "./dbConnect.mjs";
import bcrypt from 'bcrypt';
const salt = bcrypt.genSaltSync(10);

//function for inserting student data from database
async function insertAD(Email, First_name, Last_name, Hostel, Password, responsibility) {

    const query = `
      INSERT INTO admins (Email, First_name, Last_name, Hostel, Password, responsibility)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
      const pass = bcrypt.hashSync(Password,salt);
      const result = await client.query(query, [Email, First_name, Last_name, Hostel, pass, responsibility]);
      console.log("Data stored in Admin Table !");
    } catch (err) {
      console.error(err);
    }
  }
  
  //function for deleting student data from database
  async function deleteAD(Email) {
  
      const query = `DELETE FROM admins WHERE email = $1 `;
  
      try {
        const result = await client.query(query, [Email]);
        console.log(`Row Deleted with Email ${Email} from Admin Table !`);
      } catch (err) {
        console.error(err);
      }
    }


    //function for fetching admin data from database
    async function fetchAAD(Email) {
  
      const query = `SELECT email, first_name, last_name, hostel, responsibility FROM admins WHERE email = $1 `;
  
      try {
        const result = await client.query(query, [Email]);
        const data = {
          email : result.rows[0].email,
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


    //function for fetching admin data from database with parameter
    async function fetchAD(Parameter, Email) {
  
      const query = `SELECT ${Parameter} FROM admins WHERE email = $1 `;
  
      try {
        const result = await client.query(query, [Email]);
        return result.rows[0][Parameter];
      } catch (err) {
        throw new DatabaseError("DATABASE ERROR :");
      } 
    }

    //function for updating admin password into database
    async function changeAP(password, Email) {
  
      const query = `UPDATE admins SET password = $1 WHERE email = $2`;
  
      try {
        const pass = bcrypt.hashSync(password,salt);
        const result = await client.query(query, [pass,Email]);
        console.log(`Password updated of admin with email : ${Email}...`);
      } catch (err) {
        console.error(err);
      } 
    }

    export {
        insertAD,
        fetchAD,
        fetchAAD,
        deleteAD,
        changeAP
    }
