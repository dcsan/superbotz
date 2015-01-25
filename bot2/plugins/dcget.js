var debug = require("debug")("UserFacts");
// var _ = require("underscore");

exports.dcget = function(key, cb) {
  
  var memory = this.user.memory;
  var userId = this.user.id;

  // debug("getVar", key, userId);
  
  memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
    console.log("dcget");
    if (res && res.length != 0) {
      cb(err, res[0].object);
    } else {
      console.log("get returns false");
      cb(err, false);
    }
  });
}


exports.getBool = function(key, bool, cb) {
  
  var memory = this.user.memory;
  var userId = this.user.id;

  debug("getVar", key, bool, userId);
  memory.db.get({subject:key, predicate: userId}, function resultHandle(err, res){
    debug("getResults", res)
    if (res && res[0].object == "true") {
      cb(null, (bool == "true") ? true : false)
    } else {
      cb(null, (bool == "false") ? true : false)
    }
  });
}