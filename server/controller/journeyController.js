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
      message: err,
    });
  }
};
