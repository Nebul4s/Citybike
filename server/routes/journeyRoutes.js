const express = require("express");
const journeyController = require("../controller/journeyController");

const router = express.Router();

router.get("/getAll", journeyController.getAllJourneys);
router.get("/getMinMax", journeyController.getMinAndMax);
router.get("/search", journeyController.search);

router.post("/createNew", journeyController.createNewJourney);
router.post(
  "/upload",
  journeyController.uploadSingleFile,
  journeyController.uploadFile
);

module.exports = router;
