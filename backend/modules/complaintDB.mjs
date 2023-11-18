import { client } from "./dbConnect.mjs";

//function for inserting student data from database
async function insertComplaint(reg_no, name, hostel, description, imgLink, status) {

    const select = `USE mms;`;
    try {
      const result = await client.query(select);
      console.log("Database mms selected !");
    } catch (err) {
      console.error(err);
    } 
  
    const query = `
      INSERT INTO complaints (reg_no, name, hostel, description, imgLink, status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    try {
      const result = await client.query(query, [reg_no, name, hostel, description, imgLink, status]);
      console.log("Complaint stored in database !");
    } catch (err) {
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }
  