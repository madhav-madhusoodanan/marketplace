const router = require("express").Router();
const Login = require("../middleware/Login");
const Signup = require("../middleware/Signup");
// here, body must have name, password and type
// implement this as a promise
router.post(
	"/",
	Login,
	Signup
);
module.exports = router;
