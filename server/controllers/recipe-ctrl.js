const Recipes = require("../models/recipes-model");

const getrecipebyId = async (req, res) => {
  await Recipes.findOne({ _id: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "Recipe not found" });
    }

    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

const getRecipesByUser = async (req, res) => {
  await Recipes.find({ creator: req.params.id }, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!recipe) {
      return res
        .status(404)
        .json({ success: false, error: "No recipes by user found" });
    }

    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

const getRecipes = async (req, res) => {
  await Recipes.find({}, (err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!recipe.length) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    console.log(recipe);
    return res.status(200).json({ success: true, data: recipe });
  }).catch((err) => console.log(err));
};

const createRecipe = (req, res) => {
  const body = req;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a user"
    });
  }

  const x = new Recipes(req.body);

  if (!x) {
    return res.status(400).json({
      success: false,
      error: "No info sent"
    });
  }

  x.save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: x._id
      });
    })
    .catch((error) => {
      return res.status(400).json({ error, message: "Recipe not created" });
    });
};

module.exports = { getrecipebyId, getRecipes, createRecipe, getRecipesByUser };
