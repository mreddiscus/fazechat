feather.ns("fazechat");
(function() {
  fazechat.login = feather.Widget.create({
    name: "fazechat.login",
    path: "widgets/login/",
    prototype: {
    
      onInit: function() {
        
      },
      
      onReady: function() {
        var me = this;
        
        me.domEvents.bind(me.get("#login"), "submit", function(e) {
          e.preventDefault();
          
          var username = me.get("#username").val();
          var password = me.get("#password").val();
          
          me.login(username, password);
        });
      },
      
      login: function(username, password) {
        var me = this;
        
        var errorText = me.get('#error');
        
        me.server_login([{ username: username, password: password }], function(args) {
          if(args.success) {
            //redirect to main page
            window.location = "/";
          } else {
            errorText.empty().append(args.err);
          }
        });
      }
    }
  });
})();