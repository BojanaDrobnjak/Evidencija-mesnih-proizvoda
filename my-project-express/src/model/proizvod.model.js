var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var proizvodSchema = new Schema(
  {
    naziv: {
      type: String,
      unique: false,
      required: true
    },
    kolicina: {
      type: Number,
      unique: false,
      required: true
    },
    idDobavljaca: {
      type: String,
      unique: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = proizvodSchema;
