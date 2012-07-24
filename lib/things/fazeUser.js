var feather = require('../feather').getFeather(),
  _ = require('underscore');

module.exports = function(API) {
  
  //implement method overrides
  var _save = API.fazeUser.save;
  API.fazeUser.save = function(options, cb) {
    var userDoc = options.doc;
    
    //is this a new fazeUser or a document update?
    if (!userDoc._id) {

      // For new fazeUser docs, we need to validate the name
      // First, check database for duplicate username
      API.fazeUser.find({
        view: 'byUsername',
        key: userDoc.username
      }, function(err, result) {
        if (err) cb(err); else {
        
          //inspect doc count... it is an error condition if one is returned (duplicate)
          if (result.documents.length) {
            cb('There is already an user with name "' + userDoc.username + '". Please choose a different name.');
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

  var _find = API.fazeUser.find;
  API.fazeUser.find = function(options, cb) {

    _find(options, function(err, result) {
      if (err) cb(err); else {

        var errors = [];
          
        var sem = new feather.lang.Semaphore(function() {
          if (!errors.length) errors = null;
          cb(errors, result);
        });

        if (options.getFriends) {
          _.each(result.documents, function(userDoc) {
            var tempFriends = _.extend([], userDoc.friends);

            userDoc.friends = [];
            
            _.each(tempFriends, function(item, index) {
              var friendId = item['$ref'];
              debugger;
              sem.increment();
              API.fazeUser.get({
                id: friendId
              }, function(categoryErr, categoryResult) {
                debugger;
                if (categoryErr) {
                  errors.push({message: 'Error fetching friend for fazeUser "' + userDoc._id + '"', innerException: err});
                } else {
                  userDoc.friends.push(categoryResult);
                }
                sem.execute();
              });
            });
          });
        } else {
          sem.increment();
          sem.execute();
        }
      }
    });
  };

  return API.fazeUser;
};