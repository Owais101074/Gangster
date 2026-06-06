const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

router.post("/product-images", auth, upload.array("images", 5), (req, res) => {
  try {
    const imageUrls = req.files.map((file) => file.path);

    res.status(200).json({
      success: true,
      images: imageUrls,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;