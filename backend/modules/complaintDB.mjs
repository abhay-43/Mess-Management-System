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

    //fuction to change status to solved
    async function solvedComplaint(complaintId) {
  
      const query = `UPDATE complaints SET status = $1 WHERE complaintId = $2`;
      try {
        const result = await client.query(query, [true, complaintId]);
        console.log(`Complaint ${complaintId} is marked solved!`);
      } catch (err) {
        
        throw new DatabaseError("DATABASE ERROR :");
        
      }
    }

    //fuction to upvote a complaint
    async function upvoteComplaint(complaintId) {
  
      const query = `UPDATE complaints SET upvote = upvote+1 WHERE complaintId = $1`;
      try {
        const result = await client.query(query, [complaintId]);
        console.log(`Complaint ${complaintId} is upvoted!`);
      } catch (err) {
        
        throw new DatabaseError("DATABASE ERROR :");
        
      }
    }

    //fuction to downvote a complaint
    async function downvoteComplaint(complaintId) {
  
      const query = `UPDATE complaints SET downvote = downvote+1 WHERE complaintId = $1`;
      try {
        const result = await client.query(query, [complaintId]);
        console.log(`Complaint ${complaintId} is downvoted!`);
      } catch (err) {
        
        throw new DatabaseError("DATABASE ERROR :");
        
      }
    }

  export {
    insertComplaint,
    getComplaint,
    solvedComplaint,
    upvoteComplaint,
    downvoteComplaint
  }


  