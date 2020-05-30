var mongoose = require("mongoose");
var korisnikSchema = require("../model/korisnik.model");

korisnikSchema.statics = {
  create: function (data, cb) {
    var korisnik = new this(data);
    korisnik.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByName: function (query, cb) {
    this.find(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },
  confirmAccount: function (query, updateData, cb) { }
};

var korisnikModel = mongoose.model("Korisnik", korisnikSchema);
module.exports = korisnikModel;
