var mongoose = require("mongoose");
var dobavljacSchema = require("../model/dobavljac.model");

dobavljacSchema.statics = {
    create: function (data, cb) {
        var dobavljac = new this(data);
        dobavljac.save(cb);
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

var dobavljacModel = mongoose.model("Dobavljac", dobavljacSchema);
module.exports = dobavljacModel;
