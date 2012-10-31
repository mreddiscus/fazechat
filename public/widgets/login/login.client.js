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
          
          me.login();
        });
        
        me.domEvents.bind(me.get("#signup"), "submit", function(e) {
          e.preventDefault();
          
          me.signup();
        });
      },
      
      login: function() {
        var me = this;
        
        var errorText = me.get('#error');
        
        me.server_login([me.model.login], function(args) {
          if(args.success) {
            //redirect to main page
            window.location = "/";
          } else {
            errorText.empty().append(args.err);
          }
        });
      },
      
      signup: function() {
        var me = this;
        
        var errorText = me.get('#error');
        
        me.server_signup([me.model.signup], function(args) {
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