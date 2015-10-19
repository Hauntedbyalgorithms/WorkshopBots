var config = {
	channels: ["#botworkshop"],
	server: "irc.freenode.net",
	botName: "thebot"
};

var irc = require("irc");

var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

bot.addListener("join", function(channel, who) {
	bot.say(channel, who + ", nice to see you !");
});

bot.addListener('message', function (from, to, message) {
	reverser(from, to, message);
});

reverser = function(from, to, message) {
    var words = message.split(" ");
    words.reverse();
    var msg = words.join(" ");
    bot.say(to, msg);
};