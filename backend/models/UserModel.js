const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
    // profilePicture: {
    //   type: String,
    //   default: "",
    // },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
