feather.ns("fazechat");
(function() {
  fazechat.friendList = feather.Widget.create({
    name: "fazechat.friendList",
    path: "widgets/friendList/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        me.options.friends = feather.auth.user.friends;
        
        // Inject the friends template into the right panel
        me.get("#list-container").empty().append($.tmpl(me.templates.friends, me.options));
      }
    }
  });
})();