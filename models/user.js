var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs'),
  SALT_WORK_FACTOR = 10;

  var userSchema = new Schema({
    local: {
      email: String,
      password: String
  },

  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },

  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },

  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }

  });

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};



userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}
  module.exports = mongoose.model('User', userSchema);
