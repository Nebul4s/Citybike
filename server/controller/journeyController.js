const Journey = require("../model/JourneySchema");
const Features = require("../utils/features");

exports.getAllJourneys = async (req, res) => {
  try {
    const features = new Features(Journey.find(), req.query, false)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const results = new Features(Journey.find(), req.query, true).filter();

    const count = await results.query;
    const journeys = await features.query;

    res.status(200).send({
      status: "ok",
      results: count,
      data: journeys,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getMinAndMax = async (req, res) => {
  try {
    const minAndMaxValues = await Journey.aggregate([
      {
        $group: {
          _id: {
            Departure: "Departure",
            DurationSec: "DurationSec",
            CoveredDistanceMeters: "CoveredDistanceMeters",
          },
          minDeparture: { $min: "$Departure" },
          maxDeparture: { $max: "$Departure" },
          minDuration: { $min: "$DurationSec" },
          maxDuration: { $max: "$DurationSec" },
          minDistance: { $min: "$CoveredDistanceMeters" },
          maxDistance: { $max: "$CoveredDistanceMeters" },
        },
      },
    ]);

    res.status(200).send({
      status: "ok",
      data: minAndMaxValues,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.search = async (req, res) => {
  try {
    const data = new Features(Journey.find(), req.query, false)
      .search()
      .filter()
      .sort()
      .paginate();

    const count = new Features(Journey.find(), req.query, true)
      .search()
      .filter();

    const journeys = await data.query;
    const results = await count.query;

    res.status(200).send({
      status: "ok",
      results,
      data: journeys,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
};
