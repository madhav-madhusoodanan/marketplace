const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const UpdateUser = require("../middleware/UpdateUser");
const ObtainUser = require("../middleware/ObtainUser");
/* to edit profile
 * entries are optional, but are restricted to bio, password and money
 * body structure: 
 * {
 * 		"bio": "random_new_bio",
 * 		"password": "random_new_password",
 * 		"money": 1500
 * }
 * 
 * 
 */
router.post(
	"/:name", 
	AuthenticateUser, 	// user autentication
	UpdateUser, 		// allows user to edit his own details
	ObtainUser 			// displays the user's data
);

/* to get profile*/
router.get(
	"/:name", 
	AuthenticateUser, 	// user autentication
	ObtainUser 			// displays the user's data
);

module.exports = router;
