// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { corsMiddleware } = require('./middleware/middleware.js');
const recipeRoutes = require('./routes/routes'); // Adjust the path if necessary

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB using the environment variable
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Use the CORS middleware
app.use(corsMiddleware);

// Serve static files from the 'public' directory
app.use(express.static('public'));


// Use the recipe routes
app.use('/recipe', recipeRoutes); // Using '/api' as a prefix for recipe routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
