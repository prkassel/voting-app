var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  var pollSchema = new Schema({
    user: String,
    question: String,
    options: Array
  });


  module.exports = mongoose.model('Poll', pollSchema);
