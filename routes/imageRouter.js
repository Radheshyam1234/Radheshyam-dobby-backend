const express = require("express");
const {
  getAllImagesOfUser,
  uploadNewImage,
  removeImage,
} = require("../controllers/imageController");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin");

router.use(requireLogin);
router.route("/image").get(getAllImagesOfUser).post(uploadNewImage);
router.route("/:imageId").delete(removeImage);
module.exports = router;
