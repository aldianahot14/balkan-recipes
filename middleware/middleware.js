// // middleware.js

// const cors = require('cors');

// // Middleware: CORS
// const corsMiddleware = cors();

// module.exports = {
//   corsMiddleware,
// };

require("dotenv").config(); // loading env variables
// SECRET = process.env.SECRET
// console.log(SECRET)
const jwt = require("jsonwebtoken");
const isLoggedIn = async (req, res, next) => {
  try {
    // check if auth header exists
    if (req.headers.authorization) {
      // parse token from header
      const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
      if (token) {
        const payload = await jwt.verify(token, process.env.SECRET);
        if (payload) {
          // store user data in request object
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: "token verification failed" });
        }
      } else {
        res.status(400).json({ error: "malformed auth header" });
      }
    } else {
      res.status(400).json({ error: "No authorization header" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  isLoggedIn,
};