var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var korisnikSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true
    },
    korisnickoIme: {
      type: String,
      unique: true,
      required: true
    },
    sifra: {
      type: String,
      unique: false,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = korisnikSchema;
