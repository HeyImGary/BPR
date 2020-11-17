const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Users = new Schema({
  username: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String }
});

module.exports = mongoose.model("users", Users);
