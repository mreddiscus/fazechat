var feather = require('./feather').getFeather()
  , _ = require('underscore')._;

module.exports = {
  
  login: function(options, cb) {
    var request = options.request
      , username = options.username
      , password = options.password;
      
    fazechat.api.userAccount.find({
      view: 'byUserName',
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

  logout: function(sessionId, cb) {
    
  }
}
