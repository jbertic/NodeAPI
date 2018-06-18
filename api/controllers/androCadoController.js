'use strict';

var mongoose = require('mongoose'),
    Cadeau = mongoose.model('Cadeau');

exports.list_all_cadeau = function(req, res) {
  console.log("exports.list_all_cadeau")
  Cadeau.find({}, function(err, cadeau) {
    if (err)
      res.send(err);
    res.json(cadeau);
  });
};

exports.create_a_cadeau = function(req, res) {
  console.log("exports.create_a_cadeau")
  var new_cadeau = new Cadeau(req.body);
  new_cadeau.save(function(err, cadeau) {
    if (err)
      res.send(err);
    res.json(cadeau);
  });
};

exports.read_a_cadeau = function(req, res) {
  console.log("exports.read_a_cadeau")
  Cadeau.findOne({id: req.params.cadeauId}, function(err, cadeau) {
    if (err)
      res.send(err);
    res.json(cadeau);
  });
};

exports.update_a_cadeau = function(req, res) {
  console.log("exports.update_a_cadeau")
  Cadeau.findOneAndUpdate({id: req.params.cadeauId}, req.body, {new: true}, function(err, cadeau) {
    if (err)
      res.send(err);
    res.json(cadeau);
  });
};

exports.delete_a_cadeau = function(req, res) {
  console.log("exports.delete_a_cadeau")
  Cadeau.remove({
    id: req.params.cadeauId
  }, function(err, cadeau) {
    if (err)
      res.send(err);
    res.json({ message: 'Cadeau effacé avec succès !' });
  });
};

