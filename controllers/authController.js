import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
	const { name, email, password } = req.body;

    if(!name || !email || !password){
        res.status(400).json({message:"Add all fields"})
    }

	//hash password
	const salt = await bcrypt.genSalt(10);
	const newPassword = await bcrypt.hash(password, salt);

	//sql query
	const sqlInsert = "INSERT INTO user (name, email,password) VALUES (?,?,?)";

	//data insertion
	db.query(sqlInsert, [name, email, newPassword], (err, data) => {
		if (err) {
			console.log(err);
			res.status(500).json({ message: "Error inserting user" });
		} else {
			res.status(201).json({ message: "success", user_id: data.insertId });
		}
	});
};

