const User = require("../models/UserModel");
const Image = require("../models/ImageModel");

const uploadNewImage = async (req, res) => {
  try {
    const imageDetails = req.body;

    let newImage = new Image({ ...imageDetails, postedBy: req.user._id });
    await newImage.save();
    await newImage.populate({
      path: "postedBy",
      select: "userName",
    });
    res.status(200).json({ response: newImage });
  } catch (error) {
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const removeImage = async (req, res) => {
  try {
    let { imageId } = req.params;
    let image = await Image.findById(imageId);

    await image.remove();
    res.status(200).json({ response: image });
  } catch (error) {
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

const getAllImagesOfUser = async (req, res) => {
  try {
    const images = await Image.find({
      postedBy: req.user._id,
    }).sort({ createdAt: -1 });
    res.status(200).json({
      response: images,
    });
  } catch (error) {
    res.status(500).json({
      message: "Request failed please check errorMessage key for more details",
      errorMessage: error.message,
    });
  }
};

module.exports = {
  uploadNewImage,
  getAllImagesOfUser,
  removeImage,
};
