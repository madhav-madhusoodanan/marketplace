const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const AuthenticateObject = require("../middleware/AuthenticateObject");
const ReturnObjects = require("../middleware/ReturnObjects");

	/* feed only for ppl who logged in
	   link: http:localhost:6969/feed
	    *
	    */
router.get(
	"/", 
	AuthenticateUser,	// user authentication
	ReturnObjects 		// display all the objects
);

/* to submit an object to auction
 * link: http:localhost:6969/feed/add
 *
 * body structure: 
 * {
 * 		"description": "random_description",
 * 		"cost": 10
 * }
 * 
 * 
 */
router.post(
	"/add",
	AuthenticateUser, 	// user authentication
	AuthenticateObject, // verifies the details of the object put up for auction
	ReturnObjects 		// display all the objects
);

module.exports = router;
