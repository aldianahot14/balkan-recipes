// server.js
require('dotenv').config();
// const { connect } = require('mongoose');
const mongoose = require ("./database/connection.js")
const express = require('express');
const morgan = require("morgan");
const {log} = require("mercedlogger")
const cors = require("cors")
const app = express();
const bcrypt = require('bcrypt');
// const { isLoggedin } = require('./middleware/middleware.js');

const bodyParser = require('body-parser');
const { corsMiddleware } = require('./middleware/middleware.js');
const recipeRoutes = require('./routes/routes'); // Adjust the path if necessary
const UserRouter = require("../balkan-recipes/controllers/user.js") //import User Routes
const TodoRouter = require("./controllers/Todo.js")

const PORT = process.env.PORT || 3000;

// GLOBAL MIDDLEWEAR 
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(express.json()) // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working")
})
app.use("/user", UserRouter) // send all "/user" requests to UserRouter for routing
app.use("/todos", TodoRouter)

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve create-account.html for /create-account route
app.get('/create-account', (req, res) => {
  res.sendFile(__dirname + '/public/create-account.html');
});

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

