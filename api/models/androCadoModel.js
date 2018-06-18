'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CadeauSchema = new Schema({
  id: {
    type: Number,
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  link: {
    type: String,
  },
  isBuy: {
    type: Boolean
  }
});

module.exports = mongoose.model('Cadeau', CadeauSchema);