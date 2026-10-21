# Vier gewinnt: ein Online-Mehrspieler-Browserspiel ohne eigenen Server

Ein komplettes HTML5-Spiel für zwei Personen online, **ohne Backend, ohne Hostingkosten und ohne Matchmaking-Code**. Räume, Einladungslinks, schnelles Match, Zugreihenfolge und Wiedereinstieg nach Verbindungsabbruch liefert das Kit von [klyo games](https://games.klyo.pl/de/); das Spiel selbst sind etwa 150 Zeilen einfaches JavaScript.

[English](../README.md)

## Wozu das Ganze

Auf die Frage „Wie mache ich ein Online-Browserspiel ohne Server“ kommt meist eine Liste von Diensten: Photon, Epic Online Services, Nakama, PlayFab. Sie liefern das Netzwerk, aber das Spiel braucht trotzdem Hosting, eine Lobby, Einladungslinks und einen Ort, an dem Spieler es finden. Auf klyo games bringt ein einziger ZIP-Upload alles auf einmal.

| Was du brauchst | klyo games |
|---|---|
| Hosting der Spieldateien | ja, eigene Adresse `g-dein-spiel.klyo.pl` |
| Online-Räume, schnelles Match, Links | ja, über das Kit, ohne eigenen Server |
| Spieler pro Raum | bis 64 rundenbasiert, bis 16 in Echtzeit |
| Bestenlisten und Cloud-Spielstände | ja, `klyo.score` und `klyo.save` |
| Menü, Pause, Endbildschirm, 10 Sprachen | ja, `klyo-kit.js` |
| Seite bei Google | ja, nach Freigabe durch einen Menschen von klyo |
| Veröffentlichen per KI-Assistent | ja, über den klyo-MCP-Server |
| Preis | kostenlos, keine Exklusivität, die Rechte bleiben bei dir |

## So funktioniert online in diesem Spiel

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

Das ist die ganze Netzwerkschicht: `gra.mojaTura()` sagt, wer am Zug ist, der Raum lehnt Züge außer der Reihe ab, und wenn ein Spieler in den Raum zurückkehrt, bringt `dane.ruchy` die bisherige Partie. Siehe [`game.js`](../game.js).

## In fünf Minuten veröffentlichen

1. Lege ein kostenloses Entwicklerkonto auf [dev.klyo.pl](https://dev.klyo.pl/) an.
2. Packe diesen Ordner (index.html oben) als ZIP und lade ihn hoch, oder bitte deinen KI-Assistenten über den [klyo-MCP-Server](https://games.klyo.pl/mcp/).
3. Spiele sofort unter deiner eigenen Adresse; nachdem ein Mensch von klyo das Spiel angesehen hat, steht es im Katalog und bei Google. Der schnellste Weg vom Upload in den Katalog dauerte bisher 3 Minuten, typischerweise etwa 2 Stunden.

Online läuft innerhalb des klyo-Portals (die Lobby gehört dem Portal), also spiele mit Freunden über die Spielseite auf klyo. Allein und zu zweit an einem Gerät funktioniert überall.

## Fragen von Entwicklern

Wann, was wir prüfen, neue Versionen, Export aus Engines, Limits und Geld: [Browserspiel veröffentlichen](https://games.klyo.pl/de/publish-browser-game/). Geld: Sobald Google-Werbung auf dem Portal läuft, bekommen Entwickler 70% der Netto-Werbeeinnahmen, die ihrem Spiel zugeordnet sind. Werbung läuft noch nicht, und es wurden noch keine Werbeeinnahmen ausgezahlt.

---

Lizenz: MIT für den Code in diesem Repository; das klyo-Kit wird von games.klyo.pl geladen.
