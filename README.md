#GLOBAL : le générateur de cartes

Le générateur de cartes GLOBAL permet de générer automatique des cartes GLOBAL en fonction
de différents critères.

##installation de binaires (recommandé)

Télécharger les packages d'installation pour macos ou linux

##Installation et exécution manuelle

[nodejs & npm](https://nodejs.org) doivent être installés sur votre machine pour pouvoir installer electron, 
le moteur d'exécution de l'application.

### installer [electron](http://electron.atom.io/)

```
npm install -g electron-prebuilt
```

Si cette commande échoue avec une erreur  `EACCESS`, vous devrez recommencer avec  `sudo`:

```
sudo npm install -g electron-prebuilt
```

plus de détails sur cette installation [ici](https://github.com/electron-userland/electron-prebuilt)

### installer GLOBAL
télecharger les sources ou cloner ce dépôt : voir bouton vert en haut à droite de la page
```
git clone https://github.com/canals/global.git
```

installer l'application : dans le dossier téléchargé éxecuter : 
```
npm install --production
```

l'application est prête à être utilisée : 
```
electron . 
```

### installer la version développement de GLOBAL (pour les programmeurs)
même procédure sauf qu'il faut procéder à l'installation complète :
```
npm install
```

Ceci installe localement electron-prebuilt et electron-packager pour la production d'exécutables
 