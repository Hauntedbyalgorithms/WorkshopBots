/* --------------------------------------------------- */

// http://tinysubversions.com/notes/sorting-bot/

var RiTa = require('rita');
var rita = RiTa.RiTa;

var lexicon = new RiTa.RiLexicon();

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

/* --------------------------------------------------- */

