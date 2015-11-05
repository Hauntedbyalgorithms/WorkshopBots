// function to extract from lexicon all words of one type : "jj" for adjective, 
// "nn" for nouns, "vb" for verbs...
RiTa.RiLexicon.prototype.types = function(type){
    var lexicon_type = [];

    all_lexicon_words = this.words();

    for( var i=0 ; i < all_lexicon_words.length ; i++){

        temp = rita.getPosTags(all_lexicon_words[i]);

        if (temp[0] === type){
            lexicon_type.push(all_lexicon_words[i]);
        }
    }

    return lexicon_type;
};