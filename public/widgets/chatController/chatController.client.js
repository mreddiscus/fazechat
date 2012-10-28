feather.ns("fazechat");
(function() {
  fazechat.chatController = feather.Widget.create({
    name: "fazechat.chatController",
    path: "widgets/chatController/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        me.bindUI();
      },
      
      bindUI: function() {
        var me = this;
        
        me.addTab({id: "12345", name: "test"});
        me.addTab({id: "54321", name: "test2"});
        me.bindTabs();
      },
      
      bindTabs: function() {
        var me = this;
        
        me.get('#chat-tabs-nav a').click(function(e) {
          e.preventDefault();
          
          $(this).tab('show');
        });
        
        me.get('a[data-toggle="tab"]').on('shown', function(e) {
          var stripHrefId = function(target) {
            return target.href.split('#')[1];
          };
          
          // e.target = activated tab
          // e.relatedTarget = previous tab
          if (e.relatedTarget) { // If there is a previous tab
            me.get('#' + stripHrefId(e.relatedTarget)).removeClass('active'); // hide the old tab
          }
          me.get('#' + stripHrefId(e.target)).addClass('active'); // show the new tab
          
        });
        
        me.get('a[data-toggle="tab"] button.close').click(function(e) {
          debugger;
          
          var widgetId = $(this).attr("data-widget-id");
          
          var chatWidget = me.get("#" + widgetId);
          
          var stripHrefId = function(target) {
            return target.href.split('#')[1];
          };
          
          // e.target = activated tab
          
          
        });     
        
      },
      
      addTab: function(tabData) {
        var me = this;
        var tabId = me.id + "_" + tabData.id;
        
        me.get("#chat-tabs-nav").append('<li><a data-toggle="tab" href="#'
        + tabId + '">' + tabData.name + '<button data-widget-id="' + tabId + '" class="close">&times;</button></a></li>');
        
        var $new = $(this).closest('li').clone().appendTo('#cart ul')
        me.get("#chat-tabs-body").append('<div class="tab-pane" id="' + tabId + '" ></div>').each(function() {

          feather.Widget.load({
            path: "widgets/chatController/chatPanel/",
            serverOptions: {
            },
            clientOptions: {
              parent: me,
              container: $("#" + tabId),
              keepContainerOnDispose: true
            }
          });
        });
        
      }
    }
  });
})();