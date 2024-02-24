const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

//Define the  Person schema

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,

    unique: true,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  aadharCardNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["voter", "admin"],
    default: "voter",
  },
  isVoted: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  // Hash the password only if has been modified(or is new)
  if (!user.isModified("password")) return next();
  try {
    // Hash password generator
    const salt = await bcrypt.genSalt(10);

    // Hash password generation

    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Override the plain password with the hashed one
    user.password = hashedPassword;

    next();
  } catch (err) {
    return next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare the provided password withhashed password

    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;
