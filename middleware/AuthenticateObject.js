// verify if the sender is the owner
// verify the details of the object that is submitted
// make a new Objs object into req
// even push the object into the database
const Bids = require("../models/bid");
const Objects = require("../models/object");
/* 
submission type:
{
  "description": "lol",
  "cost": 20
}
*/
const AuthenticateObject = async (req, res, next) => {
	try 
	{
		switch(res.locals.user.activity)
		{
			// allowed to post
			case 0 : 
			case 10 :
					const bid = await Bids.create({
						bidder: res.locals.user._id,
						money: req.body.cost,
					});
					res.locals.object = await Objects.create({
						owner: res.locals.user._id,
						description: req.body.description,
					});
					res.locals.object.bids.push(bid);
					res.locals.object.save();
					next();
				break;
			// not allowed to post
			case 1 : 
			case 11 : throw new Error("Not allowed to post!");
			default: throw new Error("Invalid activity");
		}

	}
	catch (error)
	{
		return res.status(500).send(error);
	}
};

module.exports = AuthenticateObject;
