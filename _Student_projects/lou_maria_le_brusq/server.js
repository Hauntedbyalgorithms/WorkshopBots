Array.prototype.pick = function() {
    return this[Math.floor(Math.random()*this.length)];
};

function remplaceur(match, p1, p2, offset, string){
    return p1+p2.toLowerCase();
}

/* ------------------------ Fin de Util  --------------------------- */

var Tweeter = require('./tweeter.js');
var tweeter = new Tweeter();
var txt = "";

function sendtweet() {
    txt = simplelist.pick();

    txt = replaceAnimalsByAgencies(txt);

    tweeter.postTweet(txt);  // Turn this on to tweet
}

/* ------------------------ Fin de tweet --------------------------- */

var RiTa = require('rita'); //RiTa  = librairie rita
var rita = RiTa.RiTa;// rita =  RiTa.RiTa; = la première collone des ref rita

// var lexicon = new RiTa.RiLexicon(); // lexicon : dictionnaire

var animaux = require("./common2.json");
var agences = require("./rock_hall_of_fame.json");
var simplelist = [];

rita.loadString("la_fontaine_2.txt", coco);

/* ------------------------ Fin de Rita  --------------------------- */

//==>coco

function coco(data) {
    var arr = rita.splitSentences(data);

    for(i=0; i< arr.length; i++){
        arr[i] = arr[i].replace("\n", ".");
        arr[i] = arr[i].replace(/[ ]{2,}/g, " "); // [ ] remplace un caractère {2,} défini de ou à ou on remplace
        arr[i] = arr[i].replace(/([,;] )([A-Z])/g, remplaceur);
    }
    simplelist = arr;
    lauchTweet();
}


function lauchTweet(){
    setInterval(sendtweet, 10000);
}

function replaceAnimalsByAgencies(texte){
    rs = RiTa.RiString(texte);

    var structure = rs.features().pos.split(" ");
    var mots      = rs.features().tokens.split(" ");

    for(var i=0; i<structure.length; i++){
        if(structure[i]==='nn' || structure[i]==='nnp' || structure[i]==='nns'){

            var isanimal = mots[i];
            var agencie = switchAnimalWithAgencie( isanimal );
            console.log("RESULTAT : " +structure[i]+" "+ isanimal + " "+ agencie );
            texte = texte.replace(mots[i] , agencie);
        }
    }
    return texte;
}

function switchAnimalWithAgencie(lemot){

    var test = rita.singularize(lemot.toLowerCase());

    console.log(lemot+" -> "+test);

    for(j=0; j<animaux.noms.length; j++){
        if(test == animaux.noms[j].toLowerCase()){
            var agence = agences.agencies.pick();
            console.log(":: "+ lemot +" -> "+ agence);
            return agence;
        }
    }

    return lemot;
}
