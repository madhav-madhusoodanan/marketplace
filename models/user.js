const mongoose = require("mongoose");

const Users = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: ".",
  },
  money: {
    type: Number,
    default: 1000,
  },
  activity: {
    type: Number,
    default: 0,
    // tens digit: indicates safe to bid?
    // one's digit: indicates safe to post objects?
    // 1 -> not safe
    // 0 -> safe
    // possible options: 00, 01, 10, 11
    // 
    // only admins can change this
  },
});

module.exports = mongoose.model("Users", Users);
