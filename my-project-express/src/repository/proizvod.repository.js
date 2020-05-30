var mongoose = require("mongoose");
var proizvodSchema = require("../model/proizvod.model");

proizvodSchema.statics = {
  create: function (data, cb) {
    var proizvod = new this(data);
    proizvod.save(cb);
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
  }
};

var proizvodModel = mongoose.model("Proizvod", proizvodSchema);
module.exports = proizvodModel;
