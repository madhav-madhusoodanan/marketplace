const Objects = require("../models/object");

const ObtainObject = async (req, res, next) => {
  const { id } = req.params;
  try 
  {
		res.locals.object = await Objects.findOne({ _id: id });
    if (!object) throw new Error("no object found");
		next();
	} 
  catch (err) 
  {
		return res.send(err);
	}
};

module.exports = ObtainObject;
