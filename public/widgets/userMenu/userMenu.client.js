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
          // var user = rise.user;
          // me.showsettings(user.username);
        });

        me.domEvents.bind(me.get('#logout'), 'click', function(e) {
          me.logout();
        });

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