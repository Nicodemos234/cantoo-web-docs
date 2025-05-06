# FAQ : Questions / Réponses sur Cantoo Web

## Où est stocké le script ?

Le script peut être stocké soit chez nous, soit chez le client.

Nous recommandons, pour les grosses entreprises ayant de nombreux utilisateurs, de stocker le script chez eux. Dans ce cas, lorsqu’ils travaillent sur une release, ils téléchargent la version actuelle du script chez nous, et la testent avec leur release. Si une mise à jour importante a lieu, on préviendra le partenaire afin qu’ils puissent décider de la conduite à tenir.

Pour les entreprises plus modestes, nous recommandons plutôt de simplement utiliser le script hébergé chez nous et qui contient toujours la dernière version, permettant de s‘affranchir de la gestion des mises à jour.

## Comment intégrer le script ?

Il suffit d’ajouter cette ligne dans la page web dans laquelle vous voulez l’activer :

```html
<script src=”url du script” type="module" defer />
```

L'url du script vous aura été fourni par nos équipe.

Pour les iframes, le script tentera de s’injecter automatiquement si le domaine est le même. Sinon, il faudra l’injecter au sein de chaque iframe (avec les bons paramètres de cache, le script ne sera téléchargé qu’une seule fois)

## Peut-on gérer l’intégration plus finement ?

Oui. Avec Cantoo Web, nous mettons à disposition du site une API de communication avec le module, permettant d’utiliser toutes nos fonctionnalités de façon programmatique. Vous trouverez tous les détails sur [ce lien](https://github.com/cantoo-scribe/cantoo-web-docs/blob/main/README.md) :

Un fichier de type est en cours de création si vous utilisez Typescript.

Cette API vous permettra de faire lire un texte par la synthèse vocale, de démarrer ou arrêter une reconnaissance vocale, d’adapter un contenu html quelconque, ou de sauvegarder les préférences des utilisateurs.

## Quid de la RGPD ?

L’essentiel des traitements est fait directement sur la machine de l’utilisateur. Seuls deux services sont fournis via nos serveurs :

- Le dictionnaire
- Le traducteur

Ces traitements sont faits chez OVHCloud en France, et aucune donnée n’est stockée lors du traitement. Il est donc impossible de mettre en danger les données personnelles des utilisateurs via ce service, et les données ne sont pas transmises à des tiers.
