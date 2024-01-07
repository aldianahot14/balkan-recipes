// models.js

const mongoose = require('mongoose');

// Define the Recipe Schema
const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: [String],
    instructions: {
        type: String,
        required: true
    },
    image: String 
    // Add any other fields you need for a recipe
});

// Create the Recipe Model
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;