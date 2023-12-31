require("./models/db");
const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const groupController = require("./controllers/groupController");
const userController = require("./controllers/userController");

app.use(cors());

// Middleware to check the validity of JWT token
const checkTokenValidity = (req, res, next) => {
    // Get the token from the request header
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
  
    // Split the header to get the token part
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }
  
    const token = tokenParts[1];
  
    // Verify the token
    jwt.verify(token, 'THISISASUPERSECRETKEYTHATNOONECANGUESS', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      // Attach the decoded payload to the request for further use
      req.user = decoded;
      next();
    });
};

// Apply the middleware to all endpoints under the /group route
app.use('/group', checkTokenValidity);

app.listen(port, () => {
    console.log("The server is running on: http://localhost:" + port);
})

app.use("/group", groupController);
app.use("/user", userController);