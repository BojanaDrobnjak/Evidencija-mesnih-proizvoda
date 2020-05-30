var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var dobavljacSchema = new Schema(
{
    naziv: {
      type: String,
      unique: true,
      required: true
    }
},
{
    timestamps: true
}
);

module.exports = dobavljacSchema;
