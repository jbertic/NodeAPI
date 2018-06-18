'use strict';
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Voiture = mongoose.model('Voiture');

var LocationSchema = new Schema({
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  nomClient: {
    type: String,
    required: true,
  },
  prenomClient: {
    type: String,
    required: true
  },
  numeroClient: {
    type: String,
    required: true
  },
  rendu: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number
  },
  voiture:
    { type: Schema.Types.ObjectId, ref: 'Voiture' }
  
});

module.exports = mongoose.model('Location', LocationSchema);