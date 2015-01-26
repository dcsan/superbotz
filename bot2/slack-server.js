var request = require('request');




// Auth Token - You can generate your token from 
// https://<slack_name>.slack.com/services/new/bot
var userToken = "xoxp-2662813184-2662813192-3515247556-1b2065"
var dcToken = "xoxp-2662813184-2662813192-3513310443-0d8242";   

// egram
var token = "xoxp-2662813184-3515663524-3515664302-b8a82e";

var att1 = {
  "color": "#36a64f",
  "title": "drifter bot",
  "title_link": "http://superscriptjs.com/starter/quickstart",

  "fallback": "Required plain-text summary of the attachment.",

  "color": "#36a64f",

  "pretext": "Optional text that appears above the attachment block",

  "author_name": "Bobby Tables",
  "author_link": "http://flickr.com/bobby/",
  "author_icon": "http://flickr.com/icons/bobby.jpg",

  "title": "Slack API Documentation",
  "title_link": "https://api.slack.com/",

  "text": "Optional text that appears within the attachment",

  "fields": [
      {
          "title": "Priority",
          "value": "High",
          "short": false
      }
  ]

}


var att2 = {
  "title": "*Title*",
  "fallback": "Title: testing *right now!*",
  "text": "Testing *right now!*",

  "mrkdwn_in": ["text", "title", "fallback"]
}

// This is the main Bot interface
var superscript = require("superscript");

// slack-client provides auth and sugar around dealing with the RealTime API.
var Slack = require("slack-client");

var debug = require('debug')("Slack Client");
var facts = require("sfacts");
var factSystem = facts.explore("botfacts");


// How should we reply to the user? 
// direct - sents a DM
// atReply - sents a channel message with @username
// public sends a channel reply with no username
var replyType = "public"; 

var atReplyRE = /<@(.*?)>/;
var options = {};
options.factSystem = factSystem;

var slack = new Slack(token, true, true);

var botHandle = function(err, bot) {
  slack.login()

  slack.on('error', function(error) {
    console.error("Error:");
    console.log(error)
  })

  slack.on('open', function(){
    console.log("Welcome to Slack. You are %s of %s", slack.self.name, slack.team.name);
  })

  slack.on('close', function() {
    console.warn("Disconnected");
  })

  slack.on('message', function(data) {
    receiveData(slack, bot, data);
  });
}

var receiveData = function(slack, bot, data) {

  // Fetch the user who sent the message;
  var user = data._client.users[data.user];
  var channel;
  var messageData = data.toJSON();
  var message = "" + messageData.text.trim();
  
  var match = message.match(atReplyRE)
  
  // Are they talking to us?
  if (match && match[1] === slack.self.id) {

    bot.reply(user.name, message, function(err, reply){
      // We reply back direcly to the user

      switch (replyType) {
        case "direct": 
          channel = slack.getChannelGroupOrDMByName(user.name);
          break;
        case "atReply": 
          reply = "@" + user.name  + " " + reply.string;
        case "public":
          channel = slack.getChannelGroupOrDMByID(messageData.channel);
          break

      }
      if (reply) {
        console.log('reply', reply)
        msgpack = {
          type: "message",
          text: (reply.string || "EMPTY MESSAGE"),
          icon_url: "http://lorempixel.com/48/48/",
          // attachments: [testAttachment]
        }
        console.log("msgpack:", msgpack)
        // channel.sendMessage(msgpack)

        // imageUrl = "http://www.claimfame.com/content/uploads/2014/07/Biker-Dude-iStock-680x4521.jpg"
        // htmlText = "<img src='" + imageUrl + "' />";
        // var params = {
        //   icon_emoji: ":chart_with_upwards_trend:",
        //   channel: channel.id,
        //   // type: "message",
        //   color: "#7CD197",
        //   text: htmlText,
        //   // text: (reply.string || "EMPTY MESSAGE"),
        //   token: token,
        //   // attachments: [att2]
        // };


        // console.log("params", params);
        // // slack._apiCall("chat.postMessage", params, function(err, res){
        // //   // not actually err, res - looks like one param passed only:
        // //   // { ok: true, channel: 'C03F38ZCN', ts: '1422257778.000253' }
        // //   console.error("postMessage result:", err, res)
        // // })

        msgpack.token = token
        msgpack.channel = channel.id

        request.post({
          url: 'https://slack.com/api/chat.postMessage',
          form: msgpack 
        }, function(err, res, body){
          console.log("slackImg err, res, body", err, res);
        })

      }
        
    });

  } else if (messageData.channel[0] == "D") {
    // direct message
    bot.reply(user.name, message, function(err, reply){
      channel = slack.getChannelGroupOrDMByName(user.name);
      if (reply.string) {
        channel.send(reply.string);
      }
    });
  } else {
    console.log("Ignoring...", messageData)
  }
}

// Main entry point
new superscript('./data.json', options, function(err, botInstance){
  botHandle(null, botInstance);
});
