/*
	
	https://github.com/techpines/express.io
	https://github.com/techpines/express.io/tree/master/examples#simple-http--io-setup
	http://expressjs.com/starter/generator.html
	http://express-io.org


	!! ----------------------------------- !!
				DEBUG=myapp ./bin/www
	!! ----------------------------------- !!

*/

// var express = require('express');
// on remplace la ligne précédente par la ligne suivante,
// une fois qu'on a executé la commande «npm install express.io»
var express 		= require('express.io');
var path 			= require('path');
var favicon 		= require('serve-favicon');
var logger 			= require('morgan');
var cookieParser 	= require('cookie-parser');
var bodyParser 		= require('body-parser');

var routes 			= require('./routes/index');
var users 			= require('./routes/users');

var app 			= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});


// Send the client html.
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/client.html')
})


/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * EXPRESS.IO
 * sert à créer un socket entre le serveur et la client
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
 */

app.http().io();



app.io.on('connexion',function(socket){

	console.log('un nouvel utilisateur s’est connecté');
	socket.broadcast.emit('un nouvel utilisateur s’est connecté');

});


// Setup the ready route, and emit talk event.
app.io.route('ready', function(req) {
	app.io.broadcast('talk',{
		message:'nouvel utilisateur'
	})

	req.io.emit('talk', {
		message: 'un événement io a été reçu'
	})
})


// on analyse tous les messages reçu par «io.emit»
app.io.route('message', function(req){

	console.log("utilisateur: "+req.data.texte);


	req.io.broadcast('talk', {
		message:req.data.texte
	});


	if(req.data.texte.indexOf('bonjour') != -1 ){

		app.io.broadcast('talk', {
			message: 'Bonjour :-)'
		})

	}else{

		app.io.broadcast('talk', {
			message: 'Je ne comprend pas votre message'
		});
	}
})

/**
 * req.io.broadcast :
 * tout le monde sauf la personne qui a écrit le message d'oringine
 *
 * app.io.broadcast :
 * tout le monde
 *
 * req.io.emit :
 * juste à la personne qui a émit le message d'origine
 *
 * --> cf https://github.com/techpines/express.io/tree/master/examples#broadcasting
 *
 */

app.listen(7076);
console.log("APP RUNNING ON PORT 3000");
console.log("APP with socket.io RUNNING ON PORT 7076");

/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * FIN DE EXPRESS.IO
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++ 
 */

module.exports = app;
