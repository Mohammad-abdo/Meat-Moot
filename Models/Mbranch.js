const  mongoose = require ("mongoose");
const validate = require("validator");
const MbranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Branch must have a name'],
  },
  address: {
    type: String,
    required: [true, 'Branch must have an address'],
  },
  images: [String], // Corrected field name
  offers: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "offer",
  },
  lang: {
    type: Number,
    required: [true, 'Branch must have a longitude'],
  },
  lat: {
    type: Number,
    required: [true, 'Branch must have a latitude'],
  },
  Currency: {
    type: String,
    required: [true, 'Branch must have a currency'],
    enum: {
      values: ['$', "EGP"],
      message: 'Currency must be either $ or EGP',
    },
    default: 'EGP',
  },
  info: {
    type: String,
    required: [true, 'Branch must have information'],
  },
  region: {
    type: String,
    required: [true, 'Branch must have a region'],
    enum: {
      values: ['Africa', "Asia", 'Europe', 'Latin America', 'USA'],
      message: 'Region must be one of: Africa, Asia, Europe, Latin America, USA',
    },
    default: 'Africa',
  },
  country: {
    type: String,
    required: [true, 'Branch must have a country'],
  }
}, {
  timestamps: true,
});

const MyBranch = mongoose.model("myBranch", MbranchSchema)

module.exports = MyBranch;
