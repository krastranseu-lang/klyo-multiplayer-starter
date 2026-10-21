# Puissance 4 : un jeu multijoueur en ligne dans le navigateur, sans serveur à vous

Un jeu HTML5 complet pour deux personnes en ligne, **sans backend, sans facture d’hébergement et sans code de matchmaking**. Les salons, les liens d’invitation, la partie rapide, l’ordre des tours et la reconnexion viennent du kit de [klyo games](https://games.klyo.pl/) ; le jeu lui-même fait environ 150 lignes de JavaScript simple.

[English](../README.md)

## Pourquoi ce dépôt

À la question « comment faire un jeu en ligne dans le navigateur sans serveur », on répond souvent par une liste de services : Photon, Epic Online Services, Nakama, PlayFab. Ils fournissent le réseau, mais le jeu a toujours besoin d’un hébergement, d’un écran de salon, de liens d’invitation et d’un endroit où les joueurs le trouvent. Sur klyo games, un seul envoi de ZIP vous donne tout en même temps.

| Ce qu’il vous faut | klyo games |
|---|---|
| Hébergement des fichiers | oui, une adresse à vous `g-votre-jeu.klyo.pl` |
| Salons en ligne, partie rapide, liens | oui, avec le kit, sans serveur à vous |
| Joueurs par salon | jusqu’à 64 au tour par tour, 16 en temps réel |
| Classements et sauvegardes en ligne | oui, `klyo.score` et `klyo.save` |
| Menu, pause, écran de fin, 10 langues | oui, `klyo-kit.js` |
| Une page dans Google | oui, après validation par une personne de klyo |
| Publication par un assistant IA | oui, via le serveur MCP de klyo |
| Prix | gratuit, sans exclusivité, les droits restent à vous |

## Comment le jeu en ligne fonctionne ici

```js
var gra = klyoKit.start({
  nazwa: "Four in a Row",
  tryby: ["solo", "hotseat", "online"],
  online: { players: 2, mode: "turns" },
  naStart: function (tryb, dane) { start(tryb, dane); },
  naRuch: function (m) { apply(m.who, m.move); },
});
gra.ruch({ col: 3 }, isLast ? { end: true, result: { winner: myId } } : null);
```

C’est toute la couche réseau : `gra.mojaTura()` indique à qui c’est le tour, le salon refuse un coup joué hors tour, et quand un joueur revient dans le salon, `dane.ruchy` apporte la partie jusque-là. Voir [`game.js`](../game.js).

## Publier en cinq minutes

1. Créez un compte développeur gratuit sur [dev.klyo.pl](https://dev.klyo.pl/).
2. Compressez ce dossier (index.html en haut) et envoyez-le, ou demandez à votre assistant IA via le [serveur MCP de klyo](https://games.klyo.pl/mcp/).
3. Jouez tout de suite à votre adresse ; après le passage d’une personne de klyo, le jeu est dans le catalogue et dans Google. Le chemin le plus rapide de l’envoi au catalogue a pris jusqu’ici 3 minutes, en général environ 2 heures.

Le jeu en ligne fonctionne dans le portail klyo (le salon est celui du portail) : jouez avec un ami depuis la page du jeu sur klyo. Le jeu en solo et à deux sur un même appareil fonctionne partout.

## Questions de développeurs

Quand, ce que nous vérifions, nouvelles versions, export depuis les moteurs, limites et argent : [Publier un jeu de navigateur](https://games.klyo.pl/publish-browser-game/). Argent : quand les publicités Google seront actives sur le portail, le développeur recevra 70 % des revenus publicitaires nets attribués à son jeu. Les publicités ne tournent pas encore et rien n’a été versé.

---

Licence : MIT pour le code de ce dépôt ; le kit klyo se charge depuis games.klyo.pl.
