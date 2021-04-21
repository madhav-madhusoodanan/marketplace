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

	// random person posts a bid or seller selects bid
router.post(
	"/:id",
	AuthenticateUser, 		// user authentication
	ObtainObject, 			// obtain all the reources from server
	AuthenticateBid,		// verifies the posts that were made
	ReturnObjects 			// send the object details to the person who asked
);

module.exports = router;
