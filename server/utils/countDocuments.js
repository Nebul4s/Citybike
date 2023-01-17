const Features = require("./features");

const countDocs = async (collection, queryString) => {
  const results = new Features(collection, queryString, true).filter();

  const res = await results.query;
  return res;
};

module.exports = countDocs;
