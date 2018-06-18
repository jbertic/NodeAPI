'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Voiture = mongoose.model('Voiture');

var AgenceSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true, 
    index: { unique: true }
  },
  password: {
    type: String,
  },
  voitures:
    [{ type: Schema.Types.ObjectId, ref: 'Voiture' }]
  
});

module.exports = mongoose.model('Agence', AgenceSchema);