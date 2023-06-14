const express = require("express");
const multer = require("multer");
const path = require("path");
const auth = require("../utils/Auth");

const uploadFolder = path.join(__dirname, "../../public/assets/images");

const upload = multer({ dest: uploadFolder });
const ImageRoute = express.Router();

const ImageController = require("../controllers/ImageController");

ImageRoute.get("/", ImageController.browse);
ImageRoute.get("/:id", ImageController.read);
ImageRoute.use(auth.verifyAdmin);
ImageRoute.put("/:id", ImageController.edit);
ImageRoute.post("/", upload.single("link"), ImageController.add);
ImageRoute.delete("/:id", ImageController.destroy);

module.exports = ImageRoute;
