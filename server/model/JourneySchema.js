const mongoose = require("mongoose");

const journeySchema = new mongoose.Schema({
  Departure: {
    type: Date,
    required: true,
  },
  Return: {
    type: Date,
    required: true,
  },
  DepartureStationId: {
    type: Number,
    required: true,
  },
  DepartureStationName: {
    type: String,
    required: true,
  },
  ReturnStationId: {
    type: Number,
    required: true,
  },
  ReturnStationName: {
    type: String,
    required: true,
  },
  CoveredDistanceMeters: {
    type: Number,
    required: true,
  },
  DurationSec: {
    type: Number,
    required: true,
  },
});
journeySchema.index({
  DepartureStationName: "text",
  ReturnStationName: "text",
});

const Journey = mongoose.model("Journey", journeySchema);

module.exports = Journey;
