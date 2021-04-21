const router = require("express").Router();
const Login = require("../middleware/Login");
const Signup = require("../middleware/Signup");
/* here, body must have name, password and type
 * body structure: 
 * {
 * 		"name": "random_name",
 * 		"password": "random_password"
 * }
 * 
 * 
 */
router.post(
	"/",
	Login,		// if user exists, its a login
	Signup		// if user does not exist, its a signup
);
module.exports = router;
