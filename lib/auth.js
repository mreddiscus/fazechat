var feather = require('./feather').getFeather()
  , _ = require('underscore')._
  , bcrypt = require('bcrypt');

module.exports = {
  
  login: function(options, cb) {
    var request = options.request
      , username = options.username
      , password = options.password;
      
    fazechat.api.userAccount.find({
      view: 'byUsername',
      key: username,
      getFriends: false
    }, function(err, result) {
      if (err) cb(err); else {
      
        var login = function(user) {
          request.session.user = user;
          cb(null, user);
        };

        if (result.documents.length) {
          var userDoc = result.documents[0];
          
          if (userDoc.password === password) {
            login(userDoc);
          } else {
            cb("Incorrect password");
          }
        } else {
          cb("That account does not exist");
        }
      }
    });
  },
  
  signup: function(options, cb) {
    var request = options.request
      , username = options.username
      , password = options.password
      , email = options.email;
      
    fazechat.api.userAccount.find({
      view: 'byUsername',
      key: username,
      getFriends: false
    }, function(err, result) {
      if (err) cb(err); else {
      
        var login = function(user) {
          request.session.user = user;
          cb(null, user);
        };

        if (result.documents.length) {
          cb('There is already an user with name "' + username + '". Please choose a different name.');
        } else {
          var userDoc = {
            userName: username,
            displayName: username,
            email: email,       
            password: password,
            salt: ""
          };
          
          fazechat.api.userAccount.save({doc: userDoc}, function(err, result) {
            if (err) cb(err); else {
              login(result);
            }
          });
        }
      }
    });
  },

  logout: function(sessionId, cb) {
    feather.auth.api.logoutBySessionId(sessionId, cb);
  }
}
