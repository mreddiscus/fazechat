var feather = require('../feather').getFeather(),
  _ = require('underscore');

module.exports = function(API) {
  
  //implement method overrides
  var _save = API.userAccount.save;
  API.userAccount.save = function(options, cb) {
    var userDoc = options.doc;
    
    //is this a new userAccount or a document update?
    if (!userDoc._id) {

      // For new userAccount docs, we need to validate the name
      // First, check database for duplicate username
      API.userAccount.find({
        view: 'byUsername',
        key: userDoc.userName
      }, function(err, result) {
        if (err) cb(err); else {
        
          //inspect doc count... it is an error condition if one is returned (duplicate)
          if (result.documents.length) {
            cb('There is already an user with name "' + userDoc.userName + '". Please choose a different name.');
          } else {
            _save(options, cb);
          }
        }
      });

    } else {
      // the update case... just pass through
      _save(options, cb);
    }
  };

  var _find = API.userAccount.find;
  API.userAccount.find = function(options, cb) {

    _find(options, function(err, result) {
      if (err) cb(err); else {

        var errors = [];
          
        var sem = new feather.lang.Semaphore(function() {
          if (!errors.length) errors = null;
          cb(errors, result);
        });

        if (options.getFriends) {
          _.each(result.documents, function(userDoc) {
            
            fazechat.api.userFriends.find({
              view: 'byUserId',
              key: userDoc._id
            }, function(err, result) {
              if (err) cb(err); else {

                if (result.documents.length) {
                  var friendDoc = result.documents[0];
                  
                  userDoc.friends = [];
                  
                  _.each(friendDoc.friends, function(friend, index) {
                    var friendId = friend['$ref'];
                    
                    sem.increment();
                    API.userAccount.get({
                      id: friendId
                    }, function(friendErr, friendResult) {
                      if (friendErr) {
                        errors.push({message: 'Error fetching friend for userAccount "' + userDoc._id + '"', innerException: err});
                      } else {
                        userDoc.friends.push(friendResult);
                      }
                      sem.execute();
                    });
                  });
                } else {
                  errors.push({message: 'Error fetching friend for userAccount "' + userDoc._id + '", friend document not found', innerException: err});
                }
              }
            });
          });
        } else {
          sem.increment();
          sem.execute();
        }
      }
    });
  };

  return API.userAccount;
};