'use strict';

var mongoose = require('mongoose'),
    Voiture = mongoose.model('Voiture'),
    Location = mongoose.model('Location'),
    Agence = mongoose.model('Agence');


// Login

exports.login = function(req, res) {
  console.log("LOGIN")
  Agence.findOne ({email: req.body.email, password: req.body.password}, function(err, agence) {
    if (err) {
      res.status(500).send(err);
    } else {
      if(!agence) {
        res.status(401).send(null);
      } else {
        res.json(agence);
      }
    }
  });
};

exports.image = function(req,res) {
  console.log("IMAGE")
  var fs = require('fs');
    if (fs.existsSync(__basedir +'/api/img/'+ req.params.imageId)) {
      res.sendFile(__basedir +'/api/img/'+ req.params.imageId);
    } else {
      res.sendFile(__basedir +'/api/img/placeholder.png');
    }
  
}

// Liste toute les voitures

exports.list_voiture = function(req, res) {
  console.log("Liste voitures")

  Voiture.find({agence: req.params.agenceId}).then((voitures) => {
    res.json(voitures);
  }).catch((err) => {
    res.status(500).send(err);
  });
};

// Lit une voiture

exports.read_voiture = function(req, res) {
  console.log("Read voiture")


  Voiture.findOne({_id: req.params.voitureId}, function(err, voiture) {
    if (err)
      res.send(err);
    res.json(voiture);
  });
};

// Créer une voiture

exports.create_voiture = function(req, res) {
  console.log("Creation voiture")
  var fs = require("fs");
  fs.writeFile(__basedir +'/api/img/'+ req.body.imageName, new Buffer(req.body.image, "base64"), function(err) {});
  var new_voiture = new Voiture(req.body);
  Agence.findOne({_id:req.params.agenceId}).then((agence) => {
    agence.voitures.push(new_voiture);
    new_voiture.agence = agence;

    return agence.save();
  }).then((agence) => {
    return new_voiture.save();
  }).then((voiture) => {
    return res.json(voiture);
  }).catch((err) => {
    console.log(err);
    res.status(500).send(err);
  });
};

// Met a jour la voiture

exports.update_voiture = function(req, res) {
  console.log("Mise à jour voiture")
  var fs = require("fs");
  
  Voiture.findOne({_id: req.params.voitureId}).then((voiture) => {
    if(req.body.image) {
      fs.unlinkSync(__basedir +'/api/img/'+ voiture.imageName);
    }
    return Voiture.findOneAndUpdate({_id: req.params.voitureId}, req.body, {new: true});
  }).then((voiture) => {
    if(req.body.image) {
      fs.writeFileSync(__basedir +'/api/img/'+ req.body.imageName, new Buffer(req.body.image, "base64"));
    }
    res.json(voiture);
  }).catch((err) => {
    res.status(500).send(err);
  })
};

//Supprime la voiture

exports.delete_voiture = function(req, res) {
  console.log("Supprimer voiture")
  var fs = require("fs");
  fs.unlink(__basedir +'/api/img/'+ req.body.imageName, function(err) {});
  Voiture.remove({
    _id: req.params.voitureId
  }, function(err, voiture) {
    if (err)
      res.send(err);
    res.json({ message: 'Voiture effacé avec succès !' });
  });
};

exports.list_location = function(req, res) {
  Location.find({}).populate('voiture').then((locations) => {
    res.json(locations);
  }).catch((err) => {
    res.status(500).send(err);
  });
}

