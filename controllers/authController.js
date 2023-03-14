import { db } from "../config/db.js";
export const userSignup = async (req, res) => {
    console.log(req.body,"body");
	const { name, email, password } = req.body;

    const sqlInsert = "INSERT INTO user (name, email,password) VALUES (?,?,?)"
    db.query(sqlInsert,[name,email,password],(err,results)=>{
        if(err){
            console.log(err);
            res.status(500).json({message:"Error inserting user"})
        }else{
            res.status(201).json({message:"success"})
        }
    })


	
};
