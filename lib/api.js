var airborne = require('./airborne').getClient()
  , auth = require('./auth');

//clone the airborne api
var api = _.extend({}, airborne);

//implement overrides (pass complete api in case cross entity logic is needed)
// api.walletTransaction = walletTransaction(api);



//pull in apis
api.auth = auth;

module.exports = api;