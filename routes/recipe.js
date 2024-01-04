// routes/recipe.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.js'); // Adjust the path based on your project structure
const { isLoggedIn } = require('../middleware/middleware.js');


// Route to get all recipes
router.get('/recipes', isLoggedIn, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a specific recipe by ID
router.get('/recipes/:id', isLoggedIn, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add other routes for creating, updating, and deleting recipes

module.exports = router;
