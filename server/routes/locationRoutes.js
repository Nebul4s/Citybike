const express = require("express");
const locationController = require("../controller/locationController");

const router = express.Router();

router.route("/getAll").get(locationController.getAllLocations);
router.route("/getLocation/:location").get(locationController.getLocation);

module.exports = router;
