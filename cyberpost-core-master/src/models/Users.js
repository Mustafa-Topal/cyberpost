var mongoose = require('mongoose');
require('mongoose-type-email');
var bcrypt = require('bcrypt');

var regex = /(?:"?([^"]*)"?\s)?(?:<?(.+@[^>]+)>?)/;
var validateEmail = function(email) {
  var re = regex;
  return re.test(email)
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 3,
    max: 20
  },
  email: {
    validate: validateEmail,
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    min: 3,
    max: 128
  },
  api_key: { type: String }
});

userSchema.statics.userExists = function (username, email, callback) {
  this.findOne({
    $or: [
      { username: username },
      { email: email }
    ]
  }).exec(function (err, user) {
    if (user) { return callback(null, user) } // user already exists with email AND/OR username.
    else { return callback(err) } // no users with that email OR username exist.
  });
}

// authenticate input against database
userSchema.statics.authenticate = function (username, password, callback) {
  this.findOne({ username: username })
  .exec(function (err, user) {
    if (err) {
      return callback(err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback();
      }
    })
  });
}

// hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', userSchema);
export default User;