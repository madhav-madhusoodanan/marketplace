const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const UpdateUser = require("../middleware/UpdateUser");
const ObtainUser = require("../middleware/ObtainUser");
// to edit profile
router.post(
	"/:name", 
	AuthenticateUser, 
	UpdateUser, 
	ObtainUser
);

// to get profile
// remove AuthenticateUser if the accounts should be public on the internet
router.get(
	"/:name", 
	AuthenticateUser, 
	ObtainUser
);

module.exports = router;
