'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/androCadoController');

  // todoList Routes
  app.route('/cadeau')
    .get(todoList.list_all_cadeau)
    .post(todoList.create_a_cadeau);


  app.route('/cadeau/:cadeauId')
    .get(todoList.read_a_cadeau)
    .put(todoList.update_a_cadeau)
    .delete(todoList.delete_a_cadeau);
};