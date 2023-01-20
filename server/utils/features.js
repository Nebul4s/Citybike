class Features {
  constructor(query, queryString, count) {
    this.query = query;
    this.queryString = queryString;
    this.count = count;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "limit", "sort", "fields"];
    excludedFields.forEach((item) => delete queryObj[item]);

    if (queryObj.DepartureStationName) {
      queryObj.DepartureStationName = queryObj.DepartureStationName.split(",");
    } else {
      delete queryObj.DepartureStationName;
    }

    if (queryObj.ReturnStationName) {
      queryObj.ReturnStationName = queryObj.ReturnStationName.split(",");
    } else {
      delete queryObj.ReturnStationName;
    }

    //regular expression that replaces operators from querystring with mongodb compatible operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    if (this.count) {
      this.query.countDocuments();
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    }

    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = Features;
