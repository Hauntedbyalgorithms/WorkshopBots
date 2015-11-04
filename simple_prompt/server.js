// var args = process.argv.slice(2);
// console.log(args);

process.stdin.resume();
process.stdin.setEncoding('utf8');
 
process.stdin.on('data', texteIn);

function texteIn(entree){
	process.stdout.write('donnee: ' + entree);

	if(entree == "exit\n" || entree.indexOf("exit") != -1){
		console.log("on quitte");
		process.exit();
	}
}
