import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const userSignup = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		res.status(400).json({ message: "Add all fields" });
	}

	//sql query
	const sqlInsert = "INSERT INTO user (name, email,password) VALUES (?,?,?)";

	try {
		//hash password
		const salt = await bcrypt.genSalt(10);
		const newPassword = await bcrypt.hash(password, salt);

		//insert new user
		const user = await db.query(sqlInsert, [name, email, newPassword]);
		res.status(200).json({
			message: "user registered successfully",
			data: user[0].insertId
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: err.message });
	}
};

export const userLogin = async (req, res) => {
	const { email, password } = req.body;

	const sql = "SELECT * FROM user WHERE email = ?";

	try {
		const [rows] = await db.query(sql, [email]);
		//Email not exist
		if (rows.length === 0) {
			res.status(401).json({ message: "user not found" });
		}
		const user = rows[0];

        const matchPassword = await bcrypt.compare(password,user.password)

		if (matchPassword) {
			res.status(200).json({ message: "login succeess", data: user });
		} else {
			res.status(401).json({ message: "wrong password" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error.message });
	}
};
