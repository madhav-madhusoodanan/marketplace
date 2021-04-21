const router = require("express").Router();
const ObtainObject = require("../middleware/ObtainObject");
const AuthenticateBid = require("../middleware/AuthenticateBid");
const AuthenticateUser = require("../middleware/AuthenticateUser");
const ReturnObjects = require("../middleware/ReturnObjects");

router.get(
	"/:id", 
	ObtainObject,			// obtain the object from database
	ReturnObjects 			// send it to the person who asked
);

/* handles bids being submitted by bidders or bid being selected by seller
 * body structure (to bid, for bidders): 
 * {
 * 		"money": 150
 * }
 * 
 * body structure (to choose the bid, for seller): 
 * {
 * 		"id": "the_bid_id_of_the_choosen_bid"
 * }
 * 
 * 
 */
router.post(
	"/:id",
	AuthenticateUser, 		// user authentication
	ObtainObject, 			// obtain all the reources from server
	AuthenticateBid,		// verifies the posts that were made
	ReturnObjects 			// send the object details to the person who asked
);

module.exports = router;
