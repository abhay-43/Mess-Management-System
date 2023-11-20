import { client } from "./dbConnect.mjs";

//function for inserting student data from database
async function insertComplaint(reg_no, name, hostel, description, imgLink) {

    const query = `
      INSERT INTO complaints (reg_no, name, hostel, description, complaintDate, imgLink, status, upvote, downvote)
      VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7, $8)
    `;
    try {
      const result = await client.query(query, [reg_no, name, hostel, description, imgLink, false, 0, 0]);
      console.log("Complaint stored in database !");
    } catch (err) {
      
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }

  //fuction for selecting complaints hostelwise 
  async function getComplaint(hostel) {
  
    const query = `SELECT * FROM complaints WHERE hostel = $1 ORDER BY complaintDate DESC`;
    try {
      const result = await client.query(query, [hostel]);
      return result.rows;
    } catch (err) {
      
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }

  export {
    insertComplaint,
    getComplaint
  }


  