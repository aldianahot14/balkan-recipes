// models/Recipe.js
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
