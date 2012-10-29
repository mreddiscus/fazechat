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
        me.tabList = {};
        
        me.addTab({id: "12345", name: "test"});
        me.addTab({id: "54321", name: "test2"});
        me.bindUI();
      },
      
      bindUI: function() {
        var me = this;
        
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
        
        // Tab close button click event
        me.get('a[data-toggle="tab"] button.close').click(function(e) {
          
          var tabId = $(this).attr("data-tab-id");
          
          me.removeTab(tabId);          
        });     
        
      },
      
      addTab: function(tabData) {
        var me = this;
        var tabId = me.id + "_" + tabData.id
          , newTab = {};
        
        // Append the tab
        newTab.tab = $('<li><a data-toggle="tab" href="#' + tabId + '">' + tabData.name 
        + '<button data-tab-id="' + tabData.id + '" class="close">&times;</button></a></li>').appendTo(me.get("#chat-tabs-nav"));
        
        // Append the body
        newTab.body = $('<div class="tab-pane" id="' + tabId + '" ></div>').appendTo(me.get("#chat-tabs-body")).each(function() {

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

        // Select new tab if none are selected
        if (!me.get("ul.chat-tabs-nav li.active").length) {
          var tabs = me.get('#chat-tabs-nav a');
          $(_.last(tabs)).tab('show');
        }
        
        me.tabList[tabData.id] = newTab;
        
      },
      
      removeTab: function(tabId) {
        var me = this;
        
        // Remove each chat element, like the tab and content area
        _.each(me.tabList[tabId], function(item, key) {
          item.remove();
        });
        
        // Select new tab if none are selected
        if (!me.get("ul.chat-tabs-nav li.active").length) {
          var tabs = me.get('#chat-tabs-nav a');
          $(_.last(tabs)).tab('show');
        }
        
        delete me.tabList[tabId];
      }
    }
  });
})();