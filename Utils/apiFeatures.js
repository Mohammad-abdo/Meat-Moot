class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // copy from user query
    const queryObj = { ...this.queryString };
    // queryes wayes that i will need
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((element) => delete queryObj[element]);


    // Advanced Filter Query
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));
    //  let movieQuery = Movies.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    // Sorting  sort= 
    if (this.queryString.sort) {
      const sortQuery = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortQuery);
    } else {
      // Default sorting (you can change it as needed)
      this.query = this.query.sort("title");
    }
    return this;
  }
  limitFields() {
    // limite filesda
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      // Default field selection (exclude "__v")
      this.query = this.query.select("-__v");
    }

    return this;
  }
  pagination() {
    let page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures