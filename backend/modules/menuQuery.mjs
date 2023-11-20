import { client } from "./dbConnect.mjs";



  async function insertMenu(hostel, imgLink) {

    const query = `
      INSERT INTO menu (hostel, img) VALUES ($1, $2)`;
    try {
      const result = await client.query(query, [hostel,  imgLink]);
      console.log("Mess menu stored in database !");
    } catch (err) {
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }

  async function changeMenu(hostel, imgLink) {

    const query = `UPDATE menu SET img = $2 WHERE hostel = $1`;
    try {
      const result = await client.query(query, [hostel,  imgLink]);
      console.log("Mess menu changed !");
    } catch (err) {
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }

  async function fetchMenu(hostel) {
  
    const query = `SELECT img FROM menu WHERE hostel = $1`;
    try {
      const result = await client.query(query, [hostel]);
      return result.rows[0].img;
    } catch (err) {
      throw new DatabaseError("DATABASE ERROR :");
      
    }
  }

  export{
    changeMenu,
    insertMenu,
    fetchMenu
  }
  