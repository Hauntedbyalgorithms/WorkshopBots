# WorkshopBots
nov 3-6 2015


[Consulter le wiki](https://github.com/Hauntedbyalgorithms/WorkshopBots/wiki)


Express est un module de node qui permet de le configurer rapidement en tant que serveur web, notamment à l'aide d'un sous-module nommé express-generator.

Socket.io est un module qui a contribué à la popularité de nodeJS en raison de sa fonctionnalité permettant de créer un socket (une connexion ouverte entre le serveur et le client). Il existe une librairie nommée express.io qui permet d'ajouter facilement les fonctionnalités de socket.io à express.

Pour créer un projet avec express, vous allez créer un dossier avec le nom de votre projet.
Allez dans le dossier où vous souhaitez créer le projet avec le terminal puis exécutez les commandes suivantes :

```
sudo npm install express-generator -g
```

cette commande permet d'installer la librairir express-generator de manière globale (pour tous vos projets node). Vous n'aurez à la lancer qu'un fois pour toute dans votre ordinateur, une fois la librairie installée de cette manière elle restera disponible pour tous vos futurs projets.


```
express nom_du_projet
cd nom_du_projet && npm install
```

Cette action va avoir pour effet de créer l'arborescence suivante :

```
 ├── app.js
 ├── bin
 │   └── www
 ├── package.json
 ├── public
 │   ├── images
 │   ├── javascripts
 │   └── stylesheets
 │       └── style.css
 ├── routes
 │   ├── index.js
 │   └── users.js
 └── views
	 ├── error.jade
	 ├── index.jade
	 └── layout.jade
```

Nous allons maintenant ajouter la librairie express.io :

```
npm install express.io --save
```

Pour lancer le serveur vous allez utiliser la commande `DEBUG=nom_du_projet:* npm start` (et non pas node app.js)




