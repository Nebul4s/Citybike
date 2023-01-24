const Location = require("../model/LocationsSchema");
const Journey = require("../model/JourneySchema");
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
      message: err.message,
    });
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    let features;
    if (!req.query.page) {
      features = new Features(Location.find(), req.query, false)
        .filter()
        .sort()
        .limitFields();
    } else {
      features = new Features(Location.find(), req.query, false)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    }
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
      message: err.message,
    });
  }
};

exports.getLocationStats = async (req, res) => {
  try {
    const location = req.params.locationName;
    const departureStats = await Journey.aggregate([
      {
        $match: { DepartureStationName: location },
      },
      {
        $group: {
          _id: null,
          departureAmount: { $sum: 1 },
          avgDistanceStartingFromStation: { $avg: "$CoveredDistanceMeters" },
        },
      },
    ]);

    const returnStats = await Journey.aggregate([
      {
        $match: { ReturnStationName: location },
      },
      {
        $group: {
          _id: null,
          returnAmount: { $sum: 1 },
          avgDistanceEndingAtStation: { $avg: "$CoveredDistanceMeters" },
        },
      },
    ]);

    const topDepartureStations = await Journey.aggregate([
      {
        $match: { DepartureStationName: location },
      },
      {
        $group: {
          _id: "$ReturnStationName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    const topReturnStations = await Journey.aggregate([
      {
        $match: { ReturnStationName: location },
      },
      {
        $group: {
          _id: "$DepartureStationName",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.status(200).send({
      status: "ok",
      data: {
        departureStats,
        returnStats,
        topDepartureStations,
        topReturnStations,
      },
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
};
