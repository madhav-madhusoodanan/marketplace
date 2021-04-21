const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const UpdateUser = require("../middleware/UpdateUser");
const ObtainUser = require("../middleware/ObtainUser");
/* to edit profile
 * entries are optional, but are restricted to bio, password and money
 * body structure (for everyone, to edit their own profile only): 
 * {
 * 		"bio": "random_new_bio",
 * 		"password": "random_new_password",
 * 		"money": 1500
 * }
 * 
 *  body structure (for admins, only allowed to change activity): 
 * {
 * 		"password": "c380f51792858cc330be",
 * 		"activity": 11
 * }
 *  activity ->
 *  00 -> allowed to bid & allowed to post objects
 *  01 -> allowed to bid & not allowed to post objects
 *  10 -> not allowed to bid & allowed to post objects
 *  11 -> not allowed to bid & not allowed to post objects
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
