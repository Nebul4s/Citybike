const express = require("express");
const journeyController = require("../controller/journeyController");

const router = express.Router();

router.route("/getAll").get(journeyController.getAllJourneys);
router.route("/getMinMax").get(journeyController.getMinAndMax);
router.route("/search").get(journeyController.search);

module.exports = router;
