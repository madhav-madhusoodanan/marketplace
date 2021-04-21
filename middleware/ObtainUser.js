const Users = require("../models/user");
const ObtainUser = async (req, res, next) => {
	const { name } = req.params;
	try 
	{
		let user_raw = await Users.findOne({ name: name });
		user = JSON.parse(JSON.stringify(user_raw));
		delete user._id;
		delete user.password;
			// deleting the  details that arent to be showed
		res.status(200).send(user);
		next();
	} catch (error) 
	{
		return res.status(403).send("no such user signed up");
	}
};

module.exports = ObtainUser;
