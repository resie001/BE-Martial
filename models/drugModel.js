const mongoose = require("mongoose");
const Schema = mongoose.Schema;

require("mongoose-currency").loadType(mongoose);
var Currency = mongoose.Types.Currency;


var drugSchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    drugName: {
      type: String,
      required: true,
      unique: true,
    },
    drugImage: {
      type: String,
      required: true,
    }
}
);

var Drugs = mongoose.model("Drug", drugSchema);

module.exports = Drugs;
