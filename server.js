// Jean-Christophe Bertic

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3003,
  mongoose = require('mongoose'),
  Voiture = require('./api/models/voitureModel'), 
  Agence = require('./api/models/agenceModel'), 
  Location = require('./api/models/locationModel'),
  bodyParser = require('body-parser');

global.__basedir = __dirname; //Permet d'acceder au chemin de la racine du projet partout dans le projet.


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
var databaseName = "Locapark";
mongoose.connect('mongodb://127.0.0.1:27017/' + databaseName); 

// Limite de taille du de la requete
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));


var routes = require('./api/routes/Routes'); 
routes(app);

app.listen(port, "0.0.0.0");

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('RESTful API serveur demarrer sur: ' + port);
