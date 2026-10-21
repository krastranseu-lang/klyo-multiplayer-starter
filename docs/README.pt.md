# Quatro em linha: um jogo multijogador online no navegador sem servidor próprio

Um jogo HTML5 completo para duas pessoas online, **sem backend, sem fatura de alojamento e sem código de emparelhamento**. Salas, links de convite, jogo rápido, ordem dos turnos e regresso após uma quebra de ligação vêm do kit da [klyo games](https://games.klyo.pl/); o jogo em si tem cerca de 150 linhas de JavaScript simples.

[English](../README.md)

## Para que serve

À pergunta «como faço um jogo online no navegador sem servidor» costuma responder-se com uma lista de serviços: Photon, Epic Online Services, Nakama, PlayFab. Dão a rede, mas o jogo continua a precisar de alojamento, de um ecrã de lobby, de links de convite e de um sítio onde os jogadores o encontrem. Na klyo games um único envio de um ZIP dá-te tudo de uma vez.

| O que precisas | klyo games |
|---|---|
| Alojamento dos ficheiros | sim, endereço próprio `g-o-teu-jogo.klyo.pl` |
| Salas online, jogo rápido, links | sim, com o kit, sem servidor teu |
| Jogadores por sala | até 64 por turnos, até 16 em tempo real |
| Tabelas de recordes e gravação na nuvem | sim, `klyo.score` e `klyo.save` |
| Menu, pausa, ecrã final, 10 idiomas | sim, `klyo-kit.js` |
| Página no Google | sim, depois de uma pessoa da klyo aprovar |
| Publicação por um assistente de IA | sim, pelo servidor MCP da klyo |
| Preço | grátis, sem exclusividade, os direitos continuam teus |

## Como funciona o online neste jogo

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

É toda a camada de rede: `gra.mojaTura()` diz de quem é a vez, a sala recusa jogadas fora de vez e, quando um jogador volta à sala, `dane.ruchy` traz a partida até ali. Vê [`game.js`](../game.js).

## Publica em cinco minutos

1. Cria uma conta de programador grátis em [dev.klyo.pl](https://dev.klyo.pl/).
2. Comprime esta pasta (index.html no topo) e envia-a, ou pede ao teu assistente de IA pelo [servidor MCP da klyo](https://games.klyo.pl/mcp/).
3. Joga logo no teu endereço; depois de uma pessoa da klyo o ver, o jogo aparece no catálogo e no Google. O caminho mais rápido do envio ao catálogo demorou até agora 3 minutos, normalmente cerca de 2 horas.

O jogo online funciona dentro do portal klyo (o lobby é do portal), por isso joga com amigos a partir da página do jogo na klyo. Sozinho e a dois no mesmo dispositivo funciona em qualquer lado.

## Perguntas de programadores

Quando, o que verificamos, novas versões, exportar dos motores, limites e dinheiro: [Como publicar um jogo de navegador](https://games.klyo.pl/publish-browser-game/). Dinheiro: quando os anúncios Google estiverem ativos no portal, o programador recebe 70% da receita líquida de anúncios atribuída ao seu jogo. Os anúncios ainda não estão ativos e nada foi pago.

---

Licença: MIT para o código deste repositório; o kit klyo carrega-se de games.klyo.pl.
