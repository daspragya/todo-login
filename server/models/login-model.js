const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    userID: { type: String, required: true },
    Passwd: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
