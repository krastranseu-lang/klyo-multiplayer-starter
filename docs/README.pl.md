# Cztery w rzędzie: gra online dla wielu graczy w przeglądarce bez własnego serwera

Kompletna gra HTML5 dla dwóch osób online, **bez backendu, bez opłat za hosting i bez kodu kojarzenia graczy**. Pokoje, linki z zaproszeniem, szybki mecz, kolejność tur i powrót po zerwaniu połączenia daje zestaw [klyo games](https://games.klyo.pl/pl/), a sama gra to około 150 linii zwykłego JavaScriptu.

[English](../README.md)

## Po co to jest

Na pytanie „jak zrobić grę online w przeglądarce bez serwera” zwykle pada lista usług: Photon, Epic Online Services, Nakama, PlayFab. Dają sieć, ale gra dalej potrzebuje hostingu, ekranu lobby, linków z zaproszeniem i miejsca, w którym gracze ją znajdą. Na klyo games jedno wgranie ZIP-a daje to wszystko naraz.

| Czego potrzebujesz | klyo games |
|---|---|
| Hosting plików gry | tak, własny adres `g-twoja-gra.klyo.pl` |
| Pokoje online, szybki mecz, linki | tak, przez zestaw, bez twojego serwera |
| Graczy w pokoju | do 64 w grach turowych, do 16 na żywo |
| Rekordy i zapis w chmurze | tak, `klyo.score` i `klyo.save` |
| Menu, pauza, ekran końca, 10 języków | tak, `klyo-kit.js` |
| Strona w Google | tak, po zatwierdzeniu przez człowieka z klyo |
| Wydanie przez asystenta AI | tak, przez serwer MCP klyo |
| Cena | za darmo, bez wyłączności, prawa zostają przy tobie |

## Jak działa online w tej grze

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

To cała warstwa sieciowa: `gra.mojaTura()` mówi, czyja tura, pokój odrzuca ruch nie w swojej kolejce, a gdy gracz wraca do pokoju, `dane.ruchy` przynosi dotychczasową partię. Zobacz [`game.js`](../game.js).

## Wydaj w pięć minut

1. Załóż darmowe konto twórcy na [dev.klyo.pl](https://dev.klyo.pl/pl/).
2. Spakuj ten folder (index.html na górze) i wgraj go albo poproś asystenta AI przez [serwer MCP klyo](https://games.klyo.pl/pl/mcp/).
3. Zagraj od razu pod własnym adresem; po obejrzeniu przez człowieka z klyo gra jest w katalogu i w Google. Najszybsza droga od wgrania do katalogu trwała dotąd 3 minuty, typowo około 2 godzin.

Gra online działa wewnątrz portalu klyo (lobby jest portalu), więc ze znajomym grasz ze strony gry na klyo. Gra solo i we dwoje na jednym urządzeniu działa wszędzie.

## Pytania twórców

Kiedy, co sprawdzamy, nowe wersje, eksport z silników, limity i pieniądze: [Jak wydać grę przeglądarkową](https://games.klyo.pl/pl/jak-wydac-gre-przegladarkowa/). Pieniądze: gdy na portalu ruszą reklamy Google, twórca dostaje 70% przychodu netto z reklam przypisanego do jego gry. Dziś reklamy jeszcze nie działają i nic z reklam nie zostało wypłacone.

---

Licencja: MIT dla kodu w tym repozytorium; zestaw klyo wczytuje się z games.klyo.pl.
