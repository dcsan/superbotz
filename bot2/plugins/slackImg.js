var request = require('request');
var token = "xoxp-2662813184-3515663524-3515664302-b8a82e";
var att2 = {
  "title": "*Title*",
  "fallback": "Title: testing *right now!*",
  "text": "Testing *right now!*",
  "mrkdwn_in": ["text", "title", "fallback"]
}

exports.slackImg = function(imgUrl, cb) {
  var topic = this.user.currentTopic;
  console.log("slackImg", topic);

  var params = {
    icon_emoji: ":chart_with_upwards_trend:",
    channel: channel.id,
    // type: "message",
    color: "#7CD197",
    text: (reply.string || "EMPTY MESSAGE"),
    token: token,
    attachments: [att2]
  };

  console.log("slackImg", params);

  request.post({
    url: 'https://slack.com/api/chat.postMessage',
    form: params 
  }, function(err, res, body){
    console.log("slackImg err, res, body", err, res, body)
  })

  // cb(null, topic);

}