// routes.js

const express = require('express');
const router = express.Router();
const Recipe = require('../models/models.js'); // Adjust the path if necessary
const { isLoggedIn } = require('../middleware/middleware.js');

// Create a new recipe
router.post('/recipes', isLoggedIn, async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body);
        res.status(201).json(newRecipe); // Respond with 201 (Created) status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all recipes
router.get('/recipes', isLoggedIn, async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific recipe by ID
router.get('/recipes/:id', isLoggedIn, async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        
        if (!recipe) {
            // If the recipe with the specified ID doesn't exist
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/recipes/:id', isLoggedIn, async (req, res) => {
    try {
        console.log('Request Params ID:', req.params.id);
        console.log('Request Body:', req.body);

        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });

        console.log('Updated Recipe:', updatedRecipe);

        if (!updatedRecipe) {
            // If the recipe with the specified ID doesn't exist
            console.log('Recipe not found');
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(updatedRecipe);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});


// Delete a recipe by ID
router.delete('/recipes/:id', isLoggedIn, async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);

        if (!deletedRecipe) {
            // If the recipe with the specified ID doesn't exist
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(deletedRecipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
