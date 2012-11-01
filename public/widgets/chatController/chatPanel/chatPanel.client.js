feather.ns("fazechat");
(function() {
  fazechat.chatPanel = feather.Widget.create({
    name: "fazechat.chatPanel",
    path: "widgets/chatController/chatPanel/",
    prototype: {
      onInit: function() {
        this.chatChannel = feather.socket.subscribe({id: "test"});
      },
      onReady: function() {
        var me = this;
        
        me.bindUI();
        me.bindSocketEvents();
      },
      
      bindUI: function() {
        var me = this;
        
        // Called when you send a message
        me.domEvents.bind(me.get("#chat"), "submit", function(e) {
          e.preventDefault();
                    
          var chatInput = me.get("#chat-input");
          me.sendMessage(chatInput.val());
          chatInput.val(""); // Clear out the chat input text
        });
        
        me.get("#chat-input").keypress(function(e) {      

          if (e.which === 13 && !(e.altKey || e.ctrlKey || e.shiftKey)) { // If the pressed key was enter
            e.preventDefault();
            me.get("#chat").submit();
          }
        });
      },
      
      bindSocketEvents: function() {
        var me = this;
        
        me.chatChannel.on("message", function(args) {
          me.newMessage(args);
        });
        me.chatChannel.on("media", function(args) {
          me.newMedia(args);
        });      
      },
      
      sendMessage: function(message) {
        var me = this;

        me.chatChannel.send("message", {message: message});
      },
      
      newMessage: function(args) {
        var me = this
          , message = args.data.message.replace("\n", "<br />");

        var messageData = {
          message: message,
          userName: feather.auth.user.displayName,
          timeStamp: new Date().toString("hh:mm tt")
        };

        me.get("#chat-list").append($.tmpl(me.templates.chatEntry, {messageData: messageData}));
        
        // Put the scrollbar to the bottom
        var chatList = me.get("#chat-list");
        chatList.scrollTop( chatList[0].scrollHeight );

      },
      
      newMedia: function(args) {
        var me = this;

        debugger;
      }
    }
  });
})();