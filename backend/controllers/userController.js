const express = require("express");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

var router = express.Router();

const mongoose = require("mongoose");

const User = mongoose.model("User");

router.post("/register", async (req, res) => {
    const newUser = new User;

    newUser.userId = uuidv4();
    newUser.userName = req.body.userName;
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.contactNumber = req.body.contactNumber;
    newUser.email = req.body.email;

    // hashing and salting the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    newUser.passwordHash = hash;
    newUser.passwordSalt = salt;
    
    await newUser.save();

    res.send("New User Created!");
});

router.post("/login", async (req, res) => {
    let user = await User.findOne({
        userName: req.body.userName
    })

    if(!user) {
        res.send("No such user!").status(500);
        return;
    }

    const passwordMatched = await bcrypt.compare(req.body.password, user.passwordHash);
    if(!passwordMatched) {
        res.send("Invalid credentials!").status(500);
        return;
    }

    res.send({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        token: createToken(user.userName)
    });
})

const createToken = (userName) => {
    let token = jwt.sign({
        userName,
    },
        "THISISASUPERSECRETKEYTHATNOONECANGUESS"
    );
    return token;
}

module.exports = router;