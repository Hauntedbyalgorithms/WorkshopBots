/* --------------------------------------------------- */

// http://tinysubversions.com/notes/sorting-bot/

var RiTa = require('rita');
var rita = RiTa.RiTa;

var lexicon = new RiTa.RiLexicon();

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

/* --------------------------------------------------- */

// permet de prendre la main sur le terminal
process.stdin.resume();
// on spécifie l'encodage des caractères (pratique pour les accents)
process.stdin.setEncoding('utf8');
 
// quand on reçoit des données «data» depuis le terminal
// on execute la fonction «texteIn»
process.stdin.on('data', texteIn);

// on déclare une variable globale dans notre script
var rime;

// on déclare la fonction texteIn
// cette fonction récupère un paramètre qu'on a appelé «entree»
function texteIn(entree){

	// on affiche dans le terminal la variable «entree» précédée de «donnee: »
	process.stdout.write('donnee: ' + entree);

	// on force «entree» a être considérée comme une chaine de caractère
	// et on supprime les caractères invisibles autours
	entree = entree.toString().trim();

	// on vérifie que «entree» est différent d'une chaine de caractère vide (pas de texte)
	if(entree != ""){
		// si «entree» a du contenu
		// alors la variable «rime» = «entree» de laquelle on enleve les 2 derniers caractères
		// (à l'aide de substring)
		rime = entree;
	}

	console.log("rime avec: "+rime);

	// on déclare un phrase dans la variable «str»
	var str = "The cat took a bite!";

	// on crée un tableau nommé «arr» à partir du lexicon de rita,
	// ce tableau est constitué des mots qui riment avec la variable «rime»
	// et donc du paramètre qu'on a entré dans le terminal
	var arr = lexicon.rhymes( rime );
	
	// on créé un 2e tableau vide nommé «arr2»
	var arr2 = [];

	// on crée une boucle avec laquelle on parcours tous les éléments du tableau des rimes «arr»
	for( var i=0 ; i<arr.length ; i++){

		// on créé une variable «temp»
		// qui correspond à l'élément du tableau de rime que l'on souhaite examiner
		temp = rita.getPosTags(arr[i]);

		// si «temp» est un nom (de type «nn», «vd» pour les verbes…)
		if (temp[0] === "nn"){
			// on ajoute le nom dans notre tableau «arr2»
			arr2.push(arr[i]);
		}
	}


	// on affiche dans le terminal la phrase dont on a remplacé le mot «cat»
	// par une rime choisie au hasard
	console.log( str.replace( "cat", arr2.pick() ) );

}


