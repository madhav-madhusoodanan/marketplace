const Objs = require("../models/object");

const ReturnObjects = async (req, res) => {
	const { id } = req.params;
	if (id)
	{ // indicates a specific object
		try
		{
			await res.locals.object.populate("bids").populate("owner").execPopulate();
			console.log(`\nhehe\n ${res.locals.object}`);
			res.send({ type: `${res.locals.object._id}`, object: res.locals.object });
		} 
		catch (error)
		{
			console.log(error);
		}
	} 
	else
	{ // indicates a list of objects
		try
		{
			const objects = await Objs.find({});
			res.status(200).send(objects);
		}
		catch(err)
		{
				res
			  	.status(500)
			  	.send("umm, there was an error with the database\n " + err);
		}
	}
};
module.exports = ReturnObjects;
