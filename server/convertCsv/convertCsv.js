const fs = require("fs");
const csv = require("csvtojson");
const { Transform } = require("stream");
const { pipeline } = require("stream/promises");
const mongoose = require("mongoose");
const Location = require("../model/LocationsSchema");
const Journey = require("../model/JourneySchema");
const dotenv = require("dotenv");
const bufferingObjectStream = require("buffering-object-stream");

const convertAndImportToDatabase = async (filename) => {
  dotenv.config({ path: "../config.env" });
  const collection = "journeys";
  const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);

  mongoose.set("strictQuery", false);
  mongoose.connect(DB, () => {
    console.log("DB connection success");
  });

  const readStream = fs.createReadStream(`${__dirname}/files/${filename}`);

  const filter = new Transform({
    objectMode: true,
    transform(item, enc, callback) {
      if (
        item.DurationSec >= 10 &&
        item.CoveredDistanceMeters >= 10 &&
        collection === "journeys"
      ) {
        callback(null, item);
        return;
      }
      if (collection === "locations") {
        callback(null, item);
        return;
      }
      callback(null);
    },
  });

  const saveItemsToDb = new Transform({
    objectMode: true,
    async transform(items, enc, cb) {
      if (collection === "locations") {
        await Location.bulkWrite(
          items.map((item) => ({
            insertOne: {
              document: item,
            },
          }))
        );
        cb();
      }
      if (collection === "journeys") {
        await Journey.bulkWrite(
          items.map((item) => ({
            insertOne: {
              document: item,
            },
          }))
        );
        cb();
      }
    },
  });

  try {
    await pipeline(
      readStream,
      collection === "journeys"
        ? csv(
            {
              noheader: false,
              headers: [
                "Departure",
                "Return",
                "DepartureStationId",
                "DepartureStationName",
                "ReturnStationId",
                "ReturnStationName",
                "CoveredDistanceMeters",
                "DurationSec",
              ],
            },
            { objectMode: true }
          )
        : csv({}, { objectMode: true }),
      filter,
      bufferingObjectStream(500),
      saveItemsToDb
    );
    console.log("Stream finished");
  } catch (error) {
    console.log("Stream ended with error ", error);
  }
};

module.exports = convertAndImportToDatabase;
