/* --------------------------------------------------- */

// http://tinysubversions.com/notes/sorting-bot/

var RiTa = require('rita');
var rita = RiTa.RiTa;

var lexicon = new RiTa.RiLexicon();

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

/* --------------------------------------------------- */



// function to extract from lexicon all verbs
RiTa.RiLexicon.prototype.verbs = function(){
	var lexicon_verbs = [];

	all_lexicon_words = this.words();

	for( var i=0 ; i<all_lexicon_words.length ; i++){

		temp = rita.getPosTags(all_lexicon_words[i]);

		if (temp[0] === "vb"){
			lexicon_verbs.push(all_lexicon_words[i]);
		}
	}

	return lexicon_verbs;
}


console.log( lexicon.verbs().pick() );


verbInterval = setInterval("findVerb", 1000);

findVerb = function(){

	console.log( lexicon.verbs().pick() );
}