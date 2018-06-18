'use strict';
module.exports = function(app) {
  var locapark = require('../controllers/locaparkController');

  app.route('/agence/:agenceId/voiture')
    .post(locapark.create_voiture)
    .get(locapark.list_voiture);

  app.route('/agence/:agenceId/voiture/:voitureId')
    .put(locapark.update_voiture)
    .delete(locapark.delete_voiture)
    .get(locapark.read_voiture);
  
  app.route('/agence/:agenceId/location')
    .get(locapark.list_location);

  app.route('/login')
    .post(locapark.login)

  app.route('/image/:imageId')
    .get(locapark.image)
};