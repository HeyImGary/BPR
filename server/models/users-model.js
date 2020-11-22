const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
  followers: [{ type: String }],
  following: [{ type: String }],
  userBio: { type: String }
});

module.exports = mongoose.model("users", Users);
