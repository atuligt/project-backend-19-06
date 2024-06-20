const express = require("express");
const auth = require("../auth/auth");
const route = express.Router();
const jwt = require("jsonwebtoken");
const usermodel = require("../database/userschema");
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

// testing route

route.get("/", (req, res) => {
  res.json("running");
});

//          register user

route.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const check = await usermodel.findOne({ email: req.body.email });

    if (check) {
      return res.json("user already exists of this email");
    }

    if (req.body.values.password !== req.body.values.cpassword) {
      return res.json("password and conform password not match");
    }

    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.values.password, salt, async function (err, hash) {
        const inserting = new usermodel({
          name: req.body.values.name,
          email: req.body.values.email,
          phone: req.body.values.phone,
          password: hash,
          cpassword: hash,
        })
        const data = await inserting.save();
      });
    });

    


    res.json("registered");
  } catch (error) {
    console.log(error);
  }
});

route.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const user = await usermodel.findOne({ email: req.body.email });

    if (!user) {
      return res.json({worning: "user does not exist"});
    }
    
    bcrypt.compare(req.body.password, user.password, async function(err, result) {

    if (result == false) {
      return res.json({worning: "incorrect values"});
    }

    const authtoke = jwt.sign({ token: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const updating = await usermodel.findOneAndUpdate({ _id: user._id }, { token: authtoke });
    res.json({ token: authtoke });

  });

   

    

   
  } catch (error) {
    console.log(error);
  }
});

route.get("/fetch-user", auth, async (req, res) => {
  try {

   const userr =  await usermodel.findOne({_id: req.user._id}).select({ name: 1, phone: 1, email: 1 });
    console.log(userr)
    res.json(userr).status(200)


  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
