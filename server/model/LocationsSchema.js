const mongoose = require("mongoose");

const locationsSchema = new mongoose.Schema({
  FID: {
    type: Number,
  },
  ID: {
    type: Number,
  },
  Nimi: {
    type: String,
  },
  Namn: {
    type: String,
  },
  Name: {
    type: String,
  },
  Osoite: {
    type: String,
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
  },
  y: {
    type: String,
  },
});

locationsSchema.index({
  Nimi: "text",
  Kaupunki: "text",
});

const Location = mongoose.model("Location", locationsSchema);

module.exports = Location;
