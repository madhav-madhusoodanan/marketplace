const router = require("express").Router();
const AuthenticateUser = require("../middleware/AuthenticateUser");
const AuthenticateObject = require("../middleware/AuthenticateObject");
const ReturnObjects = require("../middleware/ReturnObjects");

// feed only for ppl who logged in
router.get(
	"/", 
	AuthenticateUser, 
	ReturnObjects
);
// missing queries, implement it ASAP

// only for adding an object
router.post(
	"/add",
	AuthenticateUser,
	AuthenticateObject,
	ReturnObjects
);

module.exports = router;
