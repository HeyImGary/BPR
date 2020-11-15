const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Recipes = new Schema({
  title: { type: String },
  tags: [{ type: String }],
  cookTime: { type: Number },
  shortDescription: { type: String }
});

module.exports = mongoose.model("recipes", Recipes);
