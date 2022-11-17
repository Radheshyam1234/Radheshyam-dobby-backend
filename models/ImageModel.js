const mongoose = require("mongoose");
const User = require("./UserModel");
const { ObjectId } = mongoose.Schema.Types;

const ImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
