var airborne = require('./airborne').getClient()
  , auth = require('./auth')
  , chat = require('./chat')
  , friends = require('./friends')
  , userAccount = require('./things/userAccount');

//clone the airborne api
var api = _.extend({}, airborne);

//implement overrides (pass complete api in case cross entity logic is needed)
api.userAccount = userAccount(api);



//pull in apis
api.auth = auth;
api.chat = chat;
api.friends = friends;

module.exports = api;