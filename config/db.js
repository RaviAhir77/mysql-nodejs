import mysql from 'mysql';
import dotenv from 'dotenv'
dotenv.config();

const connection = mysql.createConnection({
  host : process.env.DB_HOST,
  port : process.env.DB_PORT,
  user : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE,
})
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.message);
      return;
    }
    console.log('Connected to the database');
});


export default connection;
