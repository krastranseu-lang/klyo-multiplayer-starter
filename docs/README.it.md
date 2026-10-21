# Forza quattro: un gioco multigiocatore online nel browser senza un tuo server

Un gioco HTML5 completo per due persone online, **senza backend, senza costi di hosting e senza codice di matchmaking**. Stanze, link d’invito, partita veloce, ordine dei turni e rientro dopo una disconnessione arrivano dal kit di [klyo games](https://games.klyo.pl/); il gioco vero e proprio è di circa 150 righe di JavaScript semplice.

[English](../README.md)

## A cosa serve

Alla domanda «come faccio un gioco online nel browser senza server» di solito si risponde con un elenco di servizi: Photon, Epic Online Services, Nakama, PlayFab. Danno la rete, ma il gioco ha comunque bisogno di hosting, di una schermata di lobby, di link d’invito e di un posto in cui i giocatori lo trovino. Su klyo games un solo caricamento di uno ZIP ti dà tutto insieme.

| Cosa ti serve | klyo games |
|---|---|
| Hosting dei file | sì, indirizzo tuo `g-il-tuo-gioco.klyo.pl` |
| Stanze online, partita veloce, link | sì, con il kit, senza un tuo server |
| Giocatori per stanza | fino a 64 a turni, fino a 16 in tempo reale |
| Classifiche e salvataggi nel cloud | sì, `klyo.score` e `klyo.save` |
| Menu, pausa, schermata finale, 10 lingue | sì, `klyo-kit.js` |
| Pagina su Google | sì, dopo l’approvazione di una persona di klyo |
| Pubblicazione con un assistente IA | sì, tramite il server MCP di klyo |
| Prezzo | gratis, senza esclusiva, i diritti restano tuoi |

## Come funziona l’online in questo gioco

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

È tutto il livello di rete: `gra.mojaTura()` dice di chi è il turno, la stanza rifiuta mosse fuori turno e, quando un giocatore torna nella stanza, `dane.ruchy` porta la partita fin lì. Vedi [`game.js`](../game.js).

## Pubblicalo in cinque minuti

1. Crea un account sviluppatore gratuito su [dev.klyo.pl](https://dev.klyo.pl/).
2. Comprimi questa cartella (index.html in cima) e caricala, oppure chiedi al tuo assistente IA tramite il [server MCP di klyo](https://games.klyo.pl/mcp/).
3. Gioca subito al tuo indirizzo; dopo che una persona di klyo lo ha visto, il gioco è nel catalogo e su Google. Il percorso più veloce dal caricamento al catalogo finora è durato 3 minuti, di solito circa 2 ore.

Il gioco online funziona dentro il portale klyo (la lobby è del portale), quindi gioca con un amico dalla pagina del gioco su klyo. Da solo e in due sullo stesso dispositivo funziona ovunque.

## Domande degli sviluppatori

Quando, cosa controlliamo, nuove versioni, esportazione dai motori, limiti e soldi: [Come pubblicare un gioco per browser](https://games.klyo.pl/publish-browser-game/). Soldi: quando gli annunci Google saranno attivi sul portale, lo sviluppatore riceverà il 70% delle entrate pubblicitarie nette attribuite al suo gioco. Gli annunci non sono ancora attivi e non è stato pagato nulla.

---

Licenza: MIT per il codice di questo repository; il kit klyo si carica da games.klyo.pl.
