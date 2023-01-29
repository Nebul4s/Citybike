const express = require("express");
const locationController = require("../controller/locationController");

const router = express.Router();

router.get("/getAll", locationController.getAllLocations);
router.get("/getLocation/:location", locationController.getLocation);
router.get(
  "/getLocationStats/:locationName",
  locationController.getLocationStats
);

router.get("/getMinMax", locationController.getMinAndMax);
router.get("/search", locationController.search);
router.post("/createNew", locationController.createNewLocation);

module.exports = router;
