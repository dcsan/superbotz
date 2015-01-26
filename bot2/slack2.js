

// Auth Token - You can generate your token from 
// https://<slack_name>.slack.com/services/new/bot
var token = "xoxb-3513171784-Z3Ft95Nwzjlucm05fz9jRG6F";


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
        // channel.send(reply.string);

        msgpack = {
          type: "attachment",
          text: (reply.string || "EMPTY MESSAGE"),
          icon_url: "http://laorquesta.mx/wp-content/uploads/2014/12/bikers-300x225.jpg",

          attachment: {
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
        }
        // msgpack.text = "FIXED TEXT";
        // around here
        console.log("msgpack:", msgpack)
        // console.warn(channel);

        // channel.sendMessage(JSON.stringify(msgpack))
        channel.sendMessage(msgpack)
        // channel._apiCall(msgpack);

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
