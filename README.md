# Sample

## Utilisation de pebbleapp

Il est préférable d'utiliser le script pebbleapp pour créer, mettre à jour, lancer et compiler les projets d'applications basés sur Sample.

### Récupérer le script pebbleapp
```shell
sudo wget https://storage.googleapis.com/pebble-public-cdn/pebbleapp -P /usr/local/sbin && sudo chmod +x /usr/local/sbin/pebbleapp
```

### Créer un nouveau projet d'application

Par convention, on développera les projets d'application dans le dossier /srv/www/apps/<nom_application>

```shell
cd /srv/www/apps
```

Lancez pebbleapp pour créer une nouvelle application basée sur sample.

```shell
pebbleapp create <nom_application>
```

Un nouveau dépôt est initialisé dans le dossier <nom_application>. Par défaut, ce dépôt est local, c'est à dire qu'il n'est lié à aucun serveur sur github. Il sera nécessaire de créer manuellement le dépôt sur github afin de lier au nouveau projet :

```shell
git remote add origin git@github.com:<account_name>/<app_name>.git
```

Vous pouvez contrôler la bonne connexion avec votre dépôt github :

```shell
git remote -v
```

Le résultat doit être le suivant :

```shell
origin git@github.com:<account_name>/<app_name>.git (fetch)
origin git@github.com:<account_name>/<app_name>.git (push)
```

Une fois la connexion établie, il est possible d'envoyer le premier commit sur le dépôt distant.

```shell
git add * && git commit -m "Création de l'application basée sur sample" && git push
```

### Mettre à jour les sous modules

L'application utilise des sous-modules distants qui peuvent être mis à jour depuis le dossier de travail :

```shell
cd /srv/www/apps/<nom_application>
```

```shell
pebbleapp update
```

### Lancer le serveur

```shell
pebbleapp serve
```

### Compiler l'application

```shell
pebbleapp build
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
