feather.ns("fazechat");
(function() {
  fazechat.socialController = feather.Widget.create({
    name: "fazechat.socialController",
    path: "widgets/socialController/",
    prototype: {
      onInit: function() {
        
      },
      onReady: function() {
        var me = this;
        
        me.bindUI();
      },
      
      bindUI: function() {
        var me = this;
        
        me.bindTabs();
      },
      
      bindTabs: function() {
        var me = this;
        
        me.get('#social-tabs-nav a').click(function(e) {
          e.preventDefault();
          
          $(this).tab('show');
        });
        
        me.get('a[data-toggle="tab"]').on('shown', function(e) {
          var stripHrefId = function(target) {
            return target.href.split('#')[1];
          };
          
          // e.target = activated tab
          // e.relatedTarget = previous tab
          
          me.get('#' + stripHrefId(e.relatedTarget)).removeClass('active'); // hide the old tab
          me.get('#' + stripHrefId(e.target)).addClass('active'); // show the new tab
          
        });     
        
      }
    }
  });
})();