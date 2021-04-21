const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const UpdateUser = require("../middleware/UpdateUser");
const ObtainUser = require("../middleware/ObtainUser");
// to edit profile
router.post(
	"/:name", 
	AuthenticateUser, 	// user autentication
	UpdateUser, 		// allows user to edit his own details
	ObtainUser 			// displays the user's data
);

	// to get profile
	// remove AuthenticateUser if the accounts should be public on the internet
router.get(
	"/:name", 
	AuthenticateUser, 	// user autentication
	ObtainUser 			// displays the user's data
);

module.exports = router;
