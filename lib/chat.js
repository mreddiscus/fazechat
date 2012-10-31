var feather = require('./feather').getFeather()
  , _ = require('underscore')._;

var clientsBySessionId = {};
var channel = feather.socket.addChannel({
  id: "test",
  allowDirectMessaging: true,
  announceConnections: true,
  hooks: {

    subscribe: function(args, cb) {
      if (args.client.session) {
        var session = args.client.session;
        clientsBySessionId[session.id] = args.client;
      }

      cb();
    },

    disconnect: function(args, cb) {
      if (args.client.session) {
        delete clientsBySessionId[args.client.session.id];
      }
      cb();
    },

    message: function(args, cb) {
      if (args.client.id === channel.channelClient.id) {
        cb();
      } else {
        channel.sendBySessionId(args.client.session.id, 'message', {
          message: args.data.message
        });
        cb();
      }
    }
  }
});

channel.sendBySessionId = function(sessionId, message, data) {
  var client = clientsBySessionId[sessionId];
  if (client) {
    channel.sendMessage(message, data, [client]);
  } else {
    feather.logger.warn({category: 'fazechat.chat', message: 'No client found for session id ' + sessionId});
  }
};

module.exports = {};
