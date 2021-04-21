require("dotenv").config();

const jwt = require("jsonwebtoken");
const Users = require("../models/user");

const AuthenticateUser = async (req, res, next) => {
	try 
	{
		const Header_auth = req.headers["authorization"];
		const token = Header_auth && Header_auth.split(" ")[1];
		if (!token) 
			throw new Error("you're an unauthorized dude");
		const name = await jwt.verify(token, process.env.ACCESS_SECRET_TOKEN);
		res.locals.user = await Users.findOne({ name: name });
       	next();
	} 
	catch (error) 
	{
		return res.status(403).send(error);
	}
};

module.exports = AuthenticateUser;
