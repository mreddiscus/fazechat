var _ = require('underscore');

exports.onInit = function(feather, cb) {
  var airborneConfig = feather.config('airborne');

  if (airborneConfig && airborneConfig.enabled) {
    var airborne = require('airborne_client');
    airborne.createClient(airborneConfig, function(err, client) {
      try {

        if (err) {
          feather.logger.error({message: 'error creating airborne client', category: 'airborne', exception: err});
          cb();
        } else {
          
          //init our local airborne module with the generated client and move on...
          require('./lib/airborne').init(client);

          //now, build a global api object for convenient use across the app
          feather.ns('fazechat');
          fazechat.api = require('./lib/api');

          cb();        
        }

      } catch (ex) {
        feather.logger.error({message: 'error creating airborne client', category: 'airborne', exception: ex});
      }
    });
  } else {
    feather.logger.info({message: 'configured environment does not have an airborne section defined', category: 'airborne'});
    cb();
  }
};