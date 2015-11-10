var Twit = require('twit');

var secrets = {
        consumer_key: //
        consumer_secret: //
        access_token: //
        access_token_secret: //
      };

var Tweeter = module.exports = function() {
  this.T = new Twit(secrets);
};

/* ------------------------ Interface with Twitter --------------------------- */

Tweeter.prototype.postTweet = function(txt) {
  console.log('tweeting: ' + txt);
  this.T.post('statuses/update', { status: txt}, function(err, reply) {});
};
