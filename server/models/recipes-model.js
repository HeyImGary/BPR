const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Recipes = new Schema({
  title: { type: String },
  tags: [{ type: String }],
  recipe: { type: String },
  cookTime: { type: Number },
  shortDescription: { type: String },
  creator: { id: { type: String }, username: { type: String } }
});

module.exports = mongoose.model("recipes", Recipes);
