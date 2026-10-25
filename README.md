<h1 align="center">Klyo Multiplayer Starter</h1>
<p align="center"><strong>A Four in a Row browser-game example for learning online-room integration.</strong></p>
<p align="center">Plain JavaScript · Solo · Local two-player · Klyo online rooms</p>


This repository demonstrates how a browser game can use the hosted Klyo Kit for menus and online play, while keeping the game rules in its own JavaScript. Start with [`index.html`](index.html) and [`game.js`](game.js).

**No backend of your own** means the example uses Klyo's hosted room infrastructure. It does not mean online play works without a server or without the platform.

## Choose a mode

| Mode | How to try it |
| :--- | :--- |
| Solo | Serve the example locally and choose solo mode. |
| Local two-player | Use the same device and choose the local mode. |
| Online | Run the integrated game through its Klyo catalogue page and use the platform lobby and invitation flow. |

The example loads Klyo Kit from the platform. A local static server is not a self-hosted copy of Klyo's multiplayer backend, and availability of the externally loaded kit still matters.

## Run the local example

Download or clone this repository and open a terminal in its root. With Python 3 installed:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080/` and test the local modes. Use a current browser, keep the developer console open and inspect any load or runtime errors.

## Read the online integration

The example uses Klyo Kit's supported online flow rather than implementing its own lobby and room service. The important points in `game.js` are the selected modes, online-room configuration, move handling and the game's rules.

When adapting it, verify both clients agree on board state, turn order, the result and reconnect behavior. The existence of a room API does not validate every rule in a new game.

[SDK reference](https://games.klyo.pl/game-sdk/) · [Online multiplayer guide](https://games.klyo.pl/online-multiplayer-without-server/)

## Prepare a Klyo preview

1. Read the current [publishing requirements](https://games.klyo.pl/for-developers/) and developer terms.
2. Package the game with `index.html` at the ZIP root, using the current upload limits.
3. Upload it through the [developer studio](https://dev.klyo.pl/) or a configured [Klyo MCP connection](https://games.klyo.pl/mcp/).
4. Inspect the preview and diagnostics. Test touch, keyboard or mouse, resizing, game completion and restarting.
5. Test an online match with two independent sessions through the supported portal flow before describing online play as verified.

Publication and review follow the current platform workflow. No fixed review time, audience size, search-engine indexing or advertising earnings are guaranteed by this example.

## Before releasing your adaptation

Give the game its own identity and verify the actual gameplay. Check a complete match, illegal moves, a full board, a win, a rematch and returning after interruption. Keep private project files, API credentials and player data out of the package.

If the platform requires a demo stage before an online match can be tested in its catalogue environment, distinguish that demo from a fully reviewed release. Do not label a game finished merely because the menu loads.

## Translations

Existing language editions: [Polski](docs/README.pl.md) · [Українська](docs/README.uk.md) · [Deutsch](docs/README.de.md) · [Español](docs/README.es.md) · [Français](docs/README.fr.md) · [Português](docs/README.pt.md) · [Italiano](docs/README.it.md) · [Русский](docs/README.ru.md) · [Türkçe](docs/README.tr.md).

Maintainers: keep setup requirements and availability statements consistent across translations when changing the English reference.

## License and service boundary

The game code in this repository is distributed under its existing MIT license. Klyo Kit is loaded separately from the platform; the repository license is not a license to the hosted service or its backend.

For current platform terms, see the [developer information](https://games.klyo.pl/for-developers/).


---

<p align="center"><strong>Part of <a href="https://github.com/Klyo-Games">Klyo Games</a></strong>: free online browser games and HTML5 game publishing at <a href="https://games.klyo.pl/">games.klyo.pl</a>.<br>Maintained and sponsored by <a href="https://kras-trans.eu/">KRAS-TRANS</a>.</p>
