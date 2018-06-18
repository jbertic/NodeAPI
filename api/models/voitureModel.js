'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VoitureSchema = new Schema({
  marque: {
    type: String,
  },
  modele: {
    type: String,
  },
  plaque: {
    type: String,
  },
  price: {
    type: Number,
  },
  imageName: {
    type: String,
  },
  agence: { type: Schema.Types.ObjectId, ref: 'Agence' }
});

module.exports = mongoose.model('Voiture', VoitureSchema);