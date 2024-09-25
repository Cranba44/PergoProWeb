const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
      type: String,
      required: [true, "The name is mandatory"],
      unique: true,
      trim: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: [true, "The email is mandatory"],
      unique: true,
      trim: true,
      minLength: 10,
    },
    password: {
      type: String,
      required: true,
      minLength: 4,
    },
    birthdate: {
      type: String,
      required: false,
    },
  },
  { versionKey: false }
);

const userModel = mongoose.model("Users", userSchema, "users");

module.exports = userModel;