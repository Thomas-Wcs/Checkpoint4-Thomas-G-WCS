const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const images = require("./image.route");
const categorie = require("./categorie.route");
const adverts = require("./adverts.route");

router.use("/users", user);
router.use("/images", images);
router.use("/adverts", adverts);
router.use("/category", categorie);

module.exports = router;
