# Dörtlü: kendi sunucun olmadan tarayıcıda çevrimiçi çok oyunculu oyun

İki kişilik eksiksiz bir çevrimiçi HTML5 oyunu, **arka uç yok, barındırma faturası yok, eşleştirme kodu yok**. Odalar, davet bağlantıları, hızlı maç, sıra düzeni ve bağlantı koptuktan sonra geri dönüş [klyo games](https://games.klyo.pl/) setinden gelir; oyunun kendisi yaklaşık 150 satır düz JavaScript.

[English](../README.md)

## Bu ne işe yarar

«Sunucu olmadan tarayıcıda çevrimiçi oyun nasıl yapılır» sorusuna genelde bir hizmet listesiyle cevap verilir: Photon, Epic Online Services, Nakama, PlayFab. Ağı verirler, ama oyunun yine de barındırmaya, lobi ekranına, davet bağlantılarına ve oyuncuların onu bulacağı bir yere ihtiyacı vardır. klyo games’te tek bir ZIP yüklemesi hepsini birden verir.

| İhtiyacın olan | klyo games |
|---|---|
| Oyun dosyalarının barındırılması | evet, kendi adresin `g-oyunun.klyo.pl` |
| Çevrimiçi odalar, hızlı maç, bağlantılar | evet, setle, kendi sunucun olmadan |
| Odadaki oyuncu | sıra tabanlıda 64’e, gerçek zamanlıda 16’ya kadar |
| Skor tabloları ve bulutta kayıt | evet, `klyo.score` ve `klyo.save` |
| Menü, duraklat, bitiş ekranı, 10 dil | evet, `klyo-kit.js` |
| Google’da sayfa | evet, klyo’dan bir kişi onayladıktan sonra |
| Yapay zekâ asistanıyla yayın | evet, klyo MCP sunucusuyla |
| Fiyat | ücretsiz, münhasırlık yok, haklar sende kalır |

## Bu oyunda çevrimiçi nasıl çalışır

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

Bütün ağ katmanı bu: `gra.mojaTura()` sıranın kimde olduğunu söyler, oda sırası olmayan hamleyi reddeder ve bir oyuncu odaya döndüğünde `dane.ruchy` o ana kadarki maçı getirir. Bkz. [`game.js`](../game.js).

## Beş dakikada yayınla

1. [dev.klyo.pl](https://dev.klyo.pl/) üzerinde ücretsiz bir geliştirici hesabı aç.
2. Bu klasörü (index.html en üstte) ZIP yap ve yükle ya da yapay zekâ asistanından [klyo MCP sunucusu](https://games.klyo.pl/mcp/) üzerinden iste.
3. Hemen kendi adresinde oyna; klyo’dan bir kişi baktıktan sonra oyun katalogda ve Google’da olur. Yüklemeden kataloğa en hızlı yol şimdiye kadar 3 dakika sürdü, genelde yaklaşık 2 saat.

Çevrimiçi oyun klyo portalının içinde çalışır (lobi portalındır), bu yüzden arkadaşınla oyunun klyo sayfasından oyna. Tek başına ve aynı cihazda iki kişi her yerde çalışır.

## Geliştiricilerin soruları

Ne zaman, neyi kontrol ediyoruz, yeni sürümler, motorlardan dışa aktarma, sınırlar ve para: [Tarayıcı oyunu nasıl yayınlanır](https://games.klyo.pl/publish-browser-game/). Para: Google reklamları portalda çalışmaya başladığında geliştirici, oyununa atfedilen net reklam gelirinin %70’ini alır. Reklamlar henüz çalışmıyor ve hiçbir ödeme yapılmadı.

---

Lisans: bu depodaki kod için MIT; klyo seti games.klyo.pl’den yüklenir.
