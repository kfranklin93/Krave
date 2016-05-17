var mongoose = require('mongoose');

var KravingSchema = new mongoose.Schema({
  name:  {type: String, required: true },
  city:  String,
  state: String,
  zip:   Number,
  placeid: String
}, {timestamps: true});

module.exports = mongoose.model('Kraving', KravingSchema);
