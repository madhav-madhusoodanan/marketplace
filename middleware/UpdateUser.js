require("dotenv").config();
const bcrypt = require("bcrypt");
const Users = require("../models/user");
const UpdateUser = async (req, res) => {
	const { name } = req.params;
	if(req.body && req.body.password === process.env.ADMIN)
	{
		// admin access to shadow ban a user
		try
		{
			switch(req.body.activity)
			{
				// fall through is OP
				case 0:
				case 1:
				case 10:
				case 11: const user = await Users.findOne(
							{ name: res.locals.user.name }
						);
						user.activity = req.body.activity;
						await user.save();
					break;
				default: throw new Error("Invalid activity!");
			}
			
		}
		catch (error) 
		{
      			res.status(500).send(error);
    	}
	}
	else if (name === res.locals.user.name)
	{
		try
		{
			res.locals.user.img = req.body.img; 
			res.locals.user.bio = req.body.bio || ".";
			res.locals.user.password = await bcrypt.hash(req.body.password, 10);
			await res.locals.user.save();
		}
		catch (error) 
		{
      			res.send("couldnt update!");
    	}
	}
	else 
		res.status(418).send(`dont change ${name}'s details, genius!`);
};

module.exports = UpdateUser;
