var mongoose = require('mongoose');
var Schema = mongoose.Schema;


  var voteSchema = new Schema({
    poll: String,
    vote: String,
  });


  module.exports = mongoose.model('Vote', voteSchema);
