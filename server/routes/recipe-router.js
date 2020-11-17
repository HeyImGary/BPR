const express = require("express");

const Recipetrl = require("../controllers/recipe-ctrl");

const router = express.Router();

router.get("/recipes/:id", Recipetrl.getrecipebyId);
router.get("/recipes", Recipetrl.getRecipes);
router.post("/createRecipes", Recipetrl.createRecipe);
router.get("/recipesByUser/:id", Recipetrl.getRecipesByUser);

module.exports = router;
