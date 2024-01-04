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

// Connect to MongoDB using the environment variable
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });



// Use the CORS middleware
// app.use(corsMiddleware);

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

// Mock user array for testing purposes
// const users = [];

// app.use(express.json());

// app.get('/users', (req, res) => {
//   res.json(users);
// });

// app.post('/users', async (req, res) => {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = { name: req.body.name, password: hashedPassword };
//     users.push(user);
//     res.status(201).send();
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error creating user');
//   }
// });

// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name === req.body.name);

//   if (user == null) {
//     console.log('Cannot find user');
//     return res.status(400).json({ message: 'Cannot find user' });
//   }

//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       console.log('Success');
//       res.status(200).json({ message: 'Success' });
//     } else {
//       console.log('Not Allowed');
//       res.status(401).json({ message: 'Not Allowed' });
//     }
//   } catch (error) {
//     console.error(error);
//     console.log('Error during login');
//     res.status(500).json({ message: 'Error during login' });
//   }
// });
