# Cuatro en raya: un juego multijugador online para navegador sin servidor propio

Un juego HTML5 completo para dos personas online, **sin backend, sin factura de hosting y sin código de emparejamiento**. Las salas, los enlaces de invitación, la partida rápida, el orden de turnos y la reconexión vienen del kit de [klyo games](https://games.klyo.pl/); el juego en sí son unas 150 líneas de JavaScript simple.

[English](../README.md)

## Para qué sirve

A la pregunta «cómo hago un juego online para navegador sin servidor» se suele responder con una lista de servicios: Photon, Epic Online Services, Nakama, PlayFab. Dan la red, pero el juego sigue necesitando alojamiento, una pantalla de lobby, enlaces de invitación y un lugar donde los jugadores lo encuentren. En klyo games una sola subida de un ZIP te da todo a la vez.

| Lo que necesitas | klyo games |
|---|---|
| Alojamiento de los archivos | sí, dirección propia `g-tu-juego.klyo.pl` |
| Salas online, partida rápida, enlaces | sí, con el kit, sin servidor tuyo |
| Jugadores por sala | hasta 64 por turnos, hasta 16 en tiempo real |
| Clasificaciones y guardado en la nube | sí, `klyo.score` y `klyo.save` |
| Menú, pausa, pantalla final, 10 idiomas | sí, `klyo-kit.js` |
| Página en Google | sí, tras la aprobación de una persona de klyo |
| Publicación con un asistente de IA | sí, con el servidor MCP de klyo |
| Precio | gratis, sin exclusividad, los derechos siguen siendo tuyos |

## Cómo funciona el online en este juego

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

Esa es toda la capa de red: `gra.mojaTura()` indica de quién es el turno, la sala rechaza movimientos fuera de turno y, cuando un jugador vuelve a la sala, `dane.ruchy` trae la partida hasta ese momento. Mira [`game.js`](../game.js).

## Publícalo en cinco minutos

1. Crea una cuenta de desarrollador gratis en [dev.klyo.pl](https://dev.klyo.pl/).
2. Comprime esta carpeta (index.html arriba) y súbela, o pídeselo a tu asistente de IA con el [servidor MCP de klyo](https://games.klyo.pl/mcp/).
3. Juega al momento en tu propia dirección; cuando una persona de klyo lo revisa, aparece en el catálogo y en Google. La vía más rápida de la subida al catálogo tardó hasta ahora 3 minutos, normalmente unas 2 horas.

El juego online funciona dentro del portal de klyo (el lobby es del portal), así que juega con amigos desde la página del juego en klyo. Solo y dos personas en un dispositivo funcionan en cualquier sitio.

## Preguntas de desarrolladores

Cuándo, qué revisamos, nuevas versiones, exportar desde motores, límites y dinero: [Cómo publicar un juego de navegador](https://games.klyo.pl/publish-browser-game/). Dinero: cuando los anuncios de Google se activen en el portal, el desarrollador recibirá el 70% de los ingresos netos por anuncios atribuidos a su juego. Todavía no hay anuncios y no se ha pagado nada por publicidad.

---

Licencia: MIT para el código de este repositorio; el kit de klyo se carga desde games.klyo.pl.
