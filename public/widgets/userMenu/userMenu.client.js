feather.ns("fazechat");
(function() {
  fazechat.userMenu = feather.Widget.create({
    name: "fazechat.userMenu",
    path: "widgets/userMenu/",
    prototype: {
    
      onInit: function() {
        
      },
      
      onReady: function() {
        var me = this;
        
        me.domEvents.bind(me.get("#settings"), 'click', function(e) {
          // var user = fazechat.user;
          // me.showsettings(user.username);
        });

        me.domEvents.bind(me.get('#logout'), 'click', function(e) {
          me.logout();
        });
        
        if (feather.auth.user) {
          me.get("#username").empty().append(feather.auth.user.userName);
        }

      },

      logout: function() {
        var me = this;
        me.server_logout(function(result) {
          window.location = "/login/";
        });
      },

      showSettings: function(user) {
        var me = this;
      }
    }
  });
})();