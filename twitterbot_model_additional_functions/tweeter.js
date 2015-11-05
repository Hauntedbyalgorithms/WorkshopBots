var Twit = require('twit');

var secrets = {       
        consumer_key: 'Your consumer_key',
        consumer_secret: 'Your consumer_secret',
        access_token: 'Your access_token',
        access_token_secret: 'Your access_token_secret'
      };
      
var Tweeter = module.exports = function() {
  this.T = new Twit(secrets);
};

/* ------------------------ Interface with Twitter --------------------------- */

Tweeter.prototype.postTweet = function(txt) {
  console.log('tweeting: ' + txt);
  this.T.post('statuses/update', { status: txt}, function(err, reply) {});
};


Tweeter.prototype.getTweets = function(request, num) {
  this.T.get('search/tweets', { q: request, count: num }, function(err, data, response) {

    var tweets = data.statuses;

    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text);
    }

    console.log("");
  });  
};