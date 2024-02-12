const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userLoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Define the static signup method

userLoginSchema.statics.signup = async function (email, password) {
  //validator
  if (!email || !password) {
    throw Error("All filds must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not Valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// Define the static Login method
userLoginSchema.statics.login = async function (email, password) {
  //validator
  if (!email || !password) {
    throw Error("All filds must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrct password");
  }
  return user;
};

const userLoginModel = mongoose.model("user", userLoginSchema);

module.exports = userLoginModel;
