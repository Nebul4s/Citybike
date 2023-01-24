const express = require("express");
const locationController = require("../controller/locationController");

const router = express.Router();

router.route("/getAll").get(locationController.getAllLocations);
router.route("/getLocation/:location").get(locationController.getLocation);
router
  .route("/getLocationStats/:locationName")
  .get(locationController.getLocationStats);

module.exports = router;
