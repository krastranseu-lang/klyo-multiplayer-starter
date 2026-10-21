# Four in a Row: an online multiplayer browser game with no server of your own

A complete, playable HTML5 game for two players online, with **no backend, no hosting bill and no matchmaking code**. Rooms, invite links, quick match, turn order and reconnects come from the [klyo games](https://games.klyo.pl/) kit; the game itself is about 150 lines of plain JavaScript.

🌍 Read this in: [Polski](docs/README.pl.md) · [Українська](docs/README.uk.md) · [Deutsch](docs/README.de.md) · [Español](docs/README.es.md) · [Français](docs/README.fr.md) · [Português](docs/README.pt.md) · [Italiano](docs/README.it.md) · [Русский](docs/README.ru.md) · [Türkçe](docs/README.tr.md)

## Why this exists

The usual answer to "how do I make an online browser game without a server" is a list of backend services: Photon, Epic Online Services, Nakama, PlayFab. They give you the networking, but your game still needs a host, a lobby screen, invite links, and a place where players find it.

On klyo games one ZIP upload gives you all of it at once:

| What you need | klyo games |
|---|---|
| Hosting for the game files | yes, your own address `g-your-game.klyo.pl` |
| Online rooms, quick match, invite links | yes, through the kit, no server of yours |
| Turn order and reconnects | yes, the room keeps the moves and replays them |
| Players: up to | 64 in turn-based rooms, 16 in real-time rooms |
| Leaderboards and cloud saves | yes, `klyo.score` and `klyo.save` |
| Menu, pause, end screen, 10 languages | yes, `klyo-kit.js` |
| A catalogue page in Google | yes, after a person from klyo approves the game |
| AI assistant publishing (Claude, ChatGPT) | yes, through the klyo MCP server |
| Price | free, no exclusivity, the rights stay yours |

## How online works in this game

```js
var gra = klyoKit.start({
  nazwa: "Four in a Row",
  tryby: ["solo", "hotseat", "online"],      // "online" adds "Play online" to the menu
  online: { players: 2, mode: "turns" },       // the portal shows the lobby: quick match, code, invite link
  naStart: function (tryb, dane) { start(tryb, dane); },   // dane.pokoj = the room, dane.ruchy = moves so far
  naRuch: function (m) { apply(m.who, m.move); },          // every move in the room, mine too
});

// on my turn: send the move; the last one ends the match with a result
gra.ruch({ col: 3 }, isLast ? { end: true, result: { winner: myId } } : null);
```

That is the whole network layer. `gra.mojaTura()` tells you whose turn it is, the room rejects moves out of turn, and when a player comes back to the room `dane.ruchy` brings the match so far. See [`game.js`](game.js).

## Publish it in five minutes

1. Create a free developer account at [dev.klyo.pl](https://dev.klyo.pl/).
2. Zip this folder (index.html at the top) and upload it, or ask your AI assistant to do it through the [klyo MCP server](https://games.klyo.pl/mcp/).
3. Play it at your own address right away; after a person from klyo looks at it, it appears in the catalogue and in Google. The fastest way from upload to catalogue so far took 3 minutes, typically about 2 hours.

Online play runs inside the klyo portal (the lobby is the portal's), so open the game from its klyo page to play with a friend. Solo and hot-seat work anywhere.

## Questions developers ask

* **When will my game be in the catalogue?** Usually the same day. Answers to this and 16 more questions: [How to publish a browser game](https://games.klyo.pl/publish-browser-game/).
* **Do I need the kit?** No. Any HTML5 game works; the kit gives you the menu, end screen, languages and online rooms for free.
* **Which engines?** Anything that exports to the browser: Godot, Unity WebGL, GameMaker HTML5, Construct, GDevelop, Phaser, PICO-8, Defold or plain JavaScript.
* **How big?** Up to 350 MB zipped, 700 MB unpacked.
* **Money?** When Google ads go live on the portal, developers get 70% of the net ad revenue attributed to their game. Ads are not running yet, and no ad revenue has been paid out.

## License

MIT for the code in this repository. The klyo kit is loaded from games.klyo.pl.
