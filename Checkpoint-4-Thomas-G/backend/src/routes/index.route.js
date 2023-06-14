const express = require("express");

const router = express.Router();

const user = require("./userRouter");
const images = require("./image.route");
const categorie = require("./categorie.route");
const adverts = require("./adverts.route");
const nodeMailer = require("./nodeMailerRoute");

router.use("/users", user);
router.use("/images", images);
router.use("/adverts", adverts);
router.use("/category", categorie);
router.use("/nodeMailer", nodeMailer);

module.exports = router;
