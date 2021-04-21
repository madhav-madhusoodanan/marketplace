const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const AuthenticateObject = require("../middleware/AuthenticateObject");
const ReturnObjects = require("../middleware/ReturnObjects");

	// feed only for ppl who logged in
router.get(
	"/", 
	AuthenticateUser,	// user authentication
	ReturnObjects 		// display all the objects
);

	// only for adding an object
router.post(
	"/add",
	AuthenticateUser, 	// user authentication
	AuthenticateObject, // verifies the details of the object put up for auction
	ReturnObjects 		// display all the objects
);

module.exports = router;
