const Bids = require("../models/bid");
const Users = require("../models/user");
/*
structure: {
  money: 30
} 
*/

const AuthenticateBid = async (req, res, next) => {
	const temp1 = res.locals.user._id.toString(); //the guy who posted
	const temp2 = res.locals.object.owner._id.toString(); // the owner
	if (temp1 === temp2) 
	{
		try 
		{
			const promises = [];
			const bid = await Bids.findById(res.locals.chosen_bid_id);
			const bidder = await Users.findById(bid.bidder);
				// bidder wallet updating
			bidder.money -= bid.money;
			bidder.save();
				//deleting the object and its related bids
			promises = res.locals.object.bids.map(bid => bid.remove());
			await Promise.all(promises);
			res.locals.object.remove();
			res.send("the auction has been confirmed");
				// finding out all future bids of the bidder (for other objects obv)
				// in ascending order of money
			const future_bids = await Bids.find({bidder: bidder._id}).sort({money: 1});
				// finding out the max possible expense out of all the bids he may have done
			const future_bidding = future_bids.reduce((total, bid) => {
				return (total + bid.money);
			}, 0);		
				// if he tried to overspend
			if(future_bidding > bidder.money)
			{
					// making the bidder unable to bid in the future
				bidder.activity = (bidder.activity > 9 ? bidder.activity : bidder.activity + 10);
				bidder.save();
					// deleting any future bids
				promises = future_bids.map(bid => bid.remove());
				await Promise.all(promises);
					// deleting all future bids will make sure that 
					// those bids referenced by objects 
					// will be dropped
			}
		} 
		catch (error) 
		{
			res.status(500).send(error);
		}
	}
	else 
	{
		res.locals.bid = await Bids.findById(
		res.locals.object.bids[res.locals.object.bids.length - 1]._id
		);
		console.log("bid\n" + res.locals.bid + "\n");
		if (
			res.locals.bid &&
			res.locals.user &&
			res.locals.user.activity < 9 &&
			req.body.money >= res.locals.bid.money &&
			req.body.money <= res.locals.user.money
		) 
		{
		        	/* do further checks */
		        	// update the bid on the monogdb
				try 
				{
					const bid = await Bids.create({
						 bidder: res.locals.user._id, 
						 money: req.body.money 
					});
					res.locals.object.bids.push(bid);
					res.locals.object.save();
					res.send(
						`yaay bid is added : ${
							req.body.money
						}\nremaining money if bid is accepted : ${
							res.locals.user.money - req.body.money
						}`
					);
					next();
				} 
				catch (err) 
				{
					return res.send(err);
				}
    		} 
		else
      		return res.status(418).send("not possible to bid");
	}
};

module.exports = AuthenticateBid;
