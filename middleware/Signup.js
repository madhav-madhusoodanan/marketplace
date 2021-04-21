require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const Signup = async (req, res) => {
    // unique names only
	try
	{
		//salts and hashes in 1 step
		console.log(req.body.password);
		const hash = await bcrypt.hash(req.body.password, 10); 
		
		const user = await Users.create(
			{
				name: req.body.name,
				password: hash,
			});
		const accessToken = jwt.sign(
			user.name,
			process.env.ACCESS_SECRET_TOKEN
		);
		res.status(201).send({ accessToken: accessToken });
	}
	catch (error)
	{
		res.status(500).send("that was hard" + error);
	}
};

module.exports = Signup;
