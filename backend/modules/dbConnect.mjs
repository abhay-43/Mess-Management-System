import pkg from 'pg';
import bcrypt from 'bcrypt';
import { DATABASE_URL } from '../config.mjs';

const salt = bcrypt.genSaltSync(10);
const { Client } = pkg;
const client = new Client({
  connectionString: DATABASE_URL,
});

//connect database function
async function connectDB() {
    try {
      await client.connect();
      console.log("DB is connected!");
    } catch (err) {
      console.error(err);
    }
  }

  export{
    connectDB,
    client
  }