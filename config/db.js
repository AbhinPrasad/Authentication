import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
	host: process.env.SQL_HOST,
	user: process.env.USER,
	password: process.env.SQL_PASSWORD,
	database: process.env.DB_NAME
});
