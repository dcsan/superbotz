// var debug = require("debug")("UserFacts");
// var _ = require("underscore");

exports.get = function(key, cb) {
  
  var memory = this.user.memory;
  var userId = this.user.id;

  // debug("getVar", key, userId);
  
  memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
    if (res && res.length != 0) {
      cb(err, res[0].object);
    } else {
      console.log("get returns false");
      cb(err, false);
    }
  });
}
