import express from "express";
import colors from "colors";
import * as dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
	console.log(
		`server started listening on port : ${process.env.PORT}`.bgWhite
	);
});
