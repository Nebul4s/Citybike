const Location = require("../model/LocationsSchema");
const Features = require("../utils/features");

exports.getLocation = async (req, res) => {
  try {
    const location = await Location.find({
      ID: req.params.location,
    });

    res.status(200).send({
      status: "ok",
      data: location,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err,
    });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const features = new Features(Location.find(), req.query, false)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const results = new Features(Location.find(), req.query, true).filter();

    const count = await results.query;
    const locations = await features.query;

    res.status(200).send({
      status: "ok",
      results: count,
      data: locations,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err,
    });
  }
};
