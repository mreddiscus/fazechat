exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "fazechat.userMenu",
    path: "widgets/userMenu/",
    prototype: {
  	  logout: feather.Widget.serverMethod(function(_cb) {
  	  	var me = this;
        fazechat.api.auth.logout(me.request.session.id, function(err, newSession) {
          me.request.session = newSession;
          _cb(null, newSession.id);
        });
  	  })
    }
  });
};