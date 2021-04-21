const router = require("express").Router();
const ObtainObject = require("../middleware/ObtainObject");
const AuthenticateBid = require("../middleware/AuthenticateBid");
const AuthenticateUser = require("../middleware/AuthenticateUser");
const ReturnObjects = require("../middleware/ReturnObjects");

router.get(
	"/:id", 
	ObtainObject, 
	ReturnObjects
);

// random person posts a bid or seller selects bid
router.post(
"/:id",
	AuthenticateUser, 
	ObtainObject, 
	AuthenticateBid, 
	ReturnObjects
);

module.exports = router;
