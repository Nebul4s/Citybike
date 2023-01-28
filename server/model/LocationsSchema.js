const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  FID: {
    type: Number,
    unique: true,
  },
  ID: {
    type: Number,
    unique: true,
  },
  Nimi: {
    type: String,
    unique: true,
  },
  Namn: {
    type: String,
  },
  Name: {
    type: String,
  },
  Osoite: {
    type: String,
    unique: true,
  },
  Adress: {
    type: String,
  },
  Kaupunki: {
    type: String,
  },
  Stad: {
    type: String,
  },
  Operaattor: {
    type: String,
  },
  Kapasiteet: {
    type: Number,
  },
  x: {
    type: String,
    unique: true,
  },
  y: {
    type: String,
    unique: true,
  },
});

locationsSchema.index({
  Nimi: "text",
  Kaupunki: "text",
});

const Location = mongoose.model("Location", locationsSchema);

module.exports = Location;
