exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "fazechat.login",
    path: "widgets/login/",
    prototype:{
      onInit: function() {
        
      },

      login: feather.Widget.serverMethod(function(options, cb) {
        var me = this;
        
        options.request = me.request; // Add the request to the options
        fazechat.api.auth.login(options, cb);
      }),
      
      signup: feather.Widget.serverMethod(function(options, cb) {
        var me = this;
        
        options.request = me.request; // Add the request to the options
        fazechat.api.auth.signup(options, cb);
      })
    }
  });
};