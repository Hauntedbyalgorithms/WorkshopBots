var config = {
	channels: ["#botworkshop"],
	server: "irc.freenode.net",
	botName: "annebot"
};
var irc = require("irc");
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

var RiTa = require('rita');
var rita = RiTa.RiTa;
var rm   = new RiTa.RiMarkov(2);
var fullText = "";
var lesphrasesShould = [];



bot.addListener("registered", function() {
	rita.loadString("textes/fox_write.txt", fox);
});


function fox (str){
	fullText = str;


	var lesphrases = fullText.split(".");

	for(i = 0; i < lesphrases.length; i++) {
		if(isThereOneOccurrence(lesphrases[i], "should")) {
			lesphrasesShould.push(lesphrases[i]);
		}
	}
	
	setInterval(startMarkov, 30000);
}

function startMarkov() {
	console.log("startMarkov");
	rm.loadText(lesphrasesShould.join('.'));
 	var sentences = []; 
    sentences = rm.generateSentences(1);
    while(sentences[0].length > 50 || sentences[0].indexOf('should')== -1 ) {
    	sentences = rm.generateSentences(1);
    }
    console.log(sentences[0]);
    bot.say("#botworkshop", sentences[0]);
}

function isThereOneOccurrence(textOfIsThereOneOccurrence, findOfIsThereOneOccurrence) {
    for(var i = 0; i < textOfIsThereOneOccurrence.length; i++) {
        if(textOfIsThereOneOccurrence.substring(i, i + findOfIsThereOneOccurrence.length).toLowerCase() == findOfIsThereOneOccurrence.toLowerCase()) {
            return(true);
        }
    }
    return(false);
}

function isolatePhrases(mainOfIsolatedPhrases) {
    var result = [];
    var begin = 0;
    var end;
    for(var i = 0; i < mainOfIsolatedPhrases.length; i++) {
        if(mainOfIsolatedPhrases.charAt(i) == "." || mainOfIsolatedPhrases.charAt(i) == "?" || mainOfIsolatedPhrases.charAt(i) == "!") {
            this.end = i;
            if(this.begin === 0) {
                result.push(mainOfIsolatedPhrases.substring(this.begin, this.end + 1));
            }
            result.push(mainOfIsolatedPhrases.substring(this.begin + 2, this.end + 1));
            this.begin = this.end;
        }
    }
    return(result);
}

function sendMessage(to, message){
	bot.say(to, message);
}
