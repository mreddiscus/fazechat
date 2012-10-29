feather.ns("fazechat");
(function() {
  fazechat.chatPanel = feather.Widget.create({
    name: "fazechat.chatPanel",
    path: "widgets/chatController/chatPanel/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        // Called when you send a message
        me.domEvents.bind(me.get("#chat"), "submit", function(e) {
          e.preventDefault();
          
          debugger;
        });
        
        me.get("#chat-input").keypress(function(e) {      

          if (e.which === 13 && !(e.altKey || e.ctrlKey || e.shiftKey)) { // If the pressed key was enter
            e.preventDefault();
            me.get("#chat").submit();
          }
        });
      }
    }
  });
})();