exports.getWidget = function(feather, cb) {
  cb(null, {
    name: "fazechat.friendList",
    path: "widgets/friendList/",
    prototype: {
    
      onInit: function() {
        var me = this;
        
        this.scripts.push("widget.session = " + JSON.stringify(me.request.session) + ";");
      }
    }
  });
};