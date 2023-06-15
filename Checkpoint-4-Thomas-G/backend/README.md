# MVC Express

## Description

This repository is a Checkpoint from Thomas G.

ETAPES :

Clonez le dépôt depuis Github.

Exécutez npm install ou yarn install.

Créez un fichier .env à partir du fichier .env.sample et ajoutez vos paramètres de base de données. Ne supprimez pas le fichier .sample, il doit être conservé.

makefile
Copy code

Fichier .env du back :

APP_PORT=5000
FRONTEND_URL=http://localhost:xxxx
DB_HOST=localhost
DB_PORT=3306
DB_USER=UserName
DB_PASSWORD=UserPassword
DB_NAME=checkpoint4
VITE_APP_API_URL= http://localhost:xxxx/
JWT_SECRET="zfejzikfaheqsgfqgrhghzaz451564165grefezfzf1gn"
MAIL_SERVER='smtp-relay.sendinblue.com'
MAIL_PORT=587
MAIL_SENDER=testwcs004@gmail.com
MAIL_MDP=OjtadQLyY6RgTVNx

Le fichier .env du front :

VITE_BACKEND_URL=http://localhost:5000/
VITE_APP_API_URL=http://localhost:5000/

Adaptez le fichier database.sql avec vos propres tables. Importez le script dans votre serveur SQL. Vous pouvez le faire manuellement ou exécuter le script de migration (soit avec npm run migrate ou yarn run migrate).
Lancez le serveur en mode développement avec npm run dev ou yarn run dev. Cela exécutera index.js en utilisant nodemon.
Accédez à localhost:5000 avec votre navigateur préféré.
À partir de ce kit de démarrage, créez votre propre application web.
Utilisateurs de Windows
Si vous développez sur Windows, vous devez modifier votre configuration Git pour changer les règles de fin de ligne avec la commande suivante :

git config --global core.autocrlf true

Si vous n'arrivez pas à executer le migrate mettez à jour manuellement la BDD depuis le panneau d'administration (un compte admin est nécéssaire à modifier directement en BDD dans colonne role : 13579AETUO )

Exemple
Un exemple (une liste basique d'articles) est fourni (vous pouvez charger le fichier database.sql dans une base de données de test). Les URL accessibles sont :

Page d'accueil : GET localhost:5000/
Parcourir les articles : GET localhost:5000/items
Lire un article : GET localhost:5000/items/:id
Modifier un article : PUT localhost:5000/items/:id
Ajouter un article : POST localhost:5000/items
Supprimer un article : DELETE localhost:5000/items/:id
Vous pouvez trouver toutes ces routes déclarées dans le fichier src/router.js. Vous pouvez ajouter vos propres routes, contrôleurs et modèles.
