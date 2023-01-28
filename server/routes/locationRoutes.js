const express = require("express");
const locationController = require("../controller/locationController");

const router = express.Router();

router.route("/getAll").get(locationController.getAllLocations);
router.route("/getLocation/:location").get(locationController.getLocation);
router
  .route("/getLocationStats/:locationName")
  .get(locationController.getLocationStats);
router.route("/getMinMax").get(locationController.getMinAndMax);
router.route("/search").get(locationController.search);
router.route("/createNew").post(locationController.createNewLocation);

module.exports = router;
