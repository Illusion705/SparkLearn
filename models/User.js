// dependencies
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// schema
const userSchema = mongoose.Schema({
  username: String,
  displayUsername: String,
  adminLevel: {
    type: Number,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  banReason: String,
  banExpiration: Date,
  isDeleted: {
    type: Boolean,
    default: false
  }
});

// plugins
userSchema.plugin(passportLocalMongoose);

// model
const User = mongoose.model("Users", userSchema);

// export model
module.exports = User;