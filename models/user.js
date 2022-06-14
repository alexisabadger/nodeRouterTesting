const mongoose = require("mongoose");

let phoneRegex = /\d{3}-\d{3}-\d{4}$/;
let usernameRegex = /^[a-zA-Z0-9]+$/;

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 30 },
  lastName: { type: String, required: false, trim: true ,maxlength: 15 },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: { locale: 'en', strength: 2 }
    },
    match: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  },
  password: { type: String, required: true },
  address: {
    number: { type: String },
    street: { type: String },
    city: { type: String },
    zip: { type: String }
  },
  phoneNumbers: [{
    location: { type: String, required: true, enum:["home", "cell", "work"] },
    number: { type: String, required: true, match: phoneRegex }
  }],
  userName: { type: String, trim: true ,maxlength: 15 },
  created: { type: Date, default: Date.now },
  enabled: { type: Boolean, default: true },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "trial", "guest", "super"],
    default: "trial"
  }
});

module.exports = mongoose.model("User", userSchema);