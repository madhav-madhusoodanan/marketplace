const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/user");
const Login = async (req, res, next) => {
		try 
		{
			const user = await Users.findOne({ name: req.body.name });
			if (!user) next();
			else if (await bcrypt.compare(req.body.password, user.password)) 
			{
				const accessToken = jwt.sign(
					req.body.name,
					process.env.ACCESS_SECRET_TOKEN
				);
				res.status(201).send({ accessToken: accessToken });
			}
			else
				res.send("nahhh wrong password");
		} 
		catch (error) 
		{
	    		res.status(500).send(error);
	  	}

};

module.exports = Login;

