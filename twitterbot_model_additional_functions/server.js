var Tweeter = require('./tweeter.js');
var tweeter = new Tweeter();
var txt = "";

/* ------------------------ Your Program --------------------------- */

simplelist = ["Hello", "What is your name?", "How are you?", "Do you like bots?"];

function sendtweet() {
  txt = choice(simplelist);
  console.log(txt);
  tweeter.postTweet(txt);  // Turn this on to tweet
}

setInterval(sendtweet, 60000);  // Send tweet once a minute (in milliseconds)

/* ------------------------- Helpers ----------------------------- */

// Gets random element from an Array
choice = function(somelist) {
  var i = Math.floor(Math.random() * somelist.length);
  return somelist[i];
};