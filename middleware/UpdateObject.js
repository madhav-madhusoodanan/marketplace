const Bids = require('../models/bid');
const UpdateObject = async (req, res, next) => {
	if (res.locals.chosen_bid_id)
	{	
		try 
		{
			const promises = res.locals.object.bids.map(bid => Bids.deleteOne({_id: bid._id}));
			await Promise.all(promises);
			res.locals.object.remove();
			return res.send("the auction has been confirmed");
		} 
		catch (err) 
		{
			res.status(500).send(err);
		}
	}
	else
    		next();
};

module.exports = UpdateObject;
