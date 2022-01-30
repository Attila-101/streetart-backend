const User = require("../models/User");
const Streetart = require('../models/Streetart')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { json } = require("body-parser");

//handle errors:

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", email: "", password: "", confirm_password: "" };

  //validation errors:
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  //unique values errors:

  if (err.code === 11000) {
    errors[Object.keys(err.keyPattern)] = `This ${Object.keys(err.keyPattern)} is already in our database.`;
  }

  return errors;
};



//JWT
//maximum time of keeping the token (expected in seconds - set to value of 24 hours)
const maxAge = 60 * 60 * 24;

const createToken = (email, id) => {
  return jwt.sign({ email, id }, process.env.SECRET_TOKEN, {
    expiresIn: maxAge,
  });
};

//Signup && Singnin modules

module.exports.signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });

    const token = await createToken(user.email, user._id);

    console.log(token);

    res.status(201).json({ result: user, token });
  } catch (err) {
    let errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    const token = await createToken(existingUser.email, existingUser._id);

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: err });
  }
  res.send("login ");
};
