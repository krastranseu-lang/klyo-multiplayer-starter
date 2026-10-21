/* Four in a Row: an online multiplayer starter for klyo games.
   ─────────────────────────────────────────────────────────────
   No server of your own. The klyo kit gives the game a menu, an end screen and ten languages; online
   play goes through rooms on the klyo portal: the player picks "Play online", the portal shows the
   lobby (quick match, a room code, an invite link) and the kit calls naStart("online", { pokoj }).
   From there the game only does two things:
     gra.ruch({ col })                  send my move (allowed only on my turn; the server keeps the order)
     naRuch(m) => apply(m.who, m.move)  apply a move from the room (mine too: one path for everybody)
   The last move carries { end: true, result: { winner } }, and the kit shows the end screen.
   Moves the room already has come with the start, so a player who comes back to the room continues the match. */
(function () {
  "use strict";
  var COLS = 7, ROWS = 6;
  var board, turn, over, mode, room, me, players;

  var gra = klyoKit.start({
    nazwa: "Four in a Row",
    opis: { en: "Drop discs, connect four. Play a friend online from a link.", pl: "Wrzucaj krążki i ułóż cztery w rzędzie. Zagraj online ze znajomym z linku." },
    tryby: ["solo", "hotseat", "online"],
    online: { players: 2, mode: "turns" },
    naStart: function (tryb, dane) { start(tryb, dane || {}); },
    naRuch: function (m) { if (m && m.move) apply(m.who, m.move); },
  });
  klyo.ready();

  /* the board: seven column buttons drawn over the kit's stage */
  var host = gra.plotno().parentNode;
  gra.plotno().style.display = "none";
  var wrap = document.createElement("div"); wrap.className = "fr-board";
  var grid = document.createElement("div"); grid.className = "fr-grid";
  var cols = [];
  for (var c = 0; c < COLS; c++) {
    var b = document.createElement("button"); b.type = "button"; b.className = "fr-col"; b.dataset.col = c;
    b.setAttribute("aria-label", "Column " + (c + 1));
    for (var r = 0; r < ROWS; r++) { var cell = document.createElement("span"); cell.className = "fr-cell"; b.append(cell); }
    b.addEventListener("click", onColumn);
    cols.push(b); grid.append(b);
  }
  wrap.append(grid); host.append(wrap);

  function start(tryb, dane) {
    mode = tryb; over = false; turn = 0;
    board = Array.from({ length: COLS }, function () { return []; });
    room = dane.pokoj || null;
    players = room ? (room.players || []).map(function (p) { return p.who; }) : ["a", "b"];
    me = room ? room.me : null;
    draw();
    // resume: replay the moves the room already has (after a refresh or a dropped connection)
    (dane.ruchy || []).forEach(function (m) { if (m && m.move) apply(m.who, m.move); });
    if (mode === "solo" && turn === 1) setTimeout(bot, 400);
  }

  function myTurn() {
    if (over) return false;
    if (mode === "online") return gra.mojaTura();
    if (mode === "solo") return turn === 0;
    return true; // hot-seat: both players share the device
  }

  function onColumn(e) {
    var col = Number(e.currentTarget.dataset.col);
    if (!myTurn() || board[col].length >= ROWS) { gra.dzwiek.graj("blad"); return; }
    if (mode === "online") {
      // the room checks the turn and broadcasts the move to everybody, me included (naRuch applies it)
      var after = simulate(col, playerIndex(me));
      gra.ruch({ col: col }, after.end ? { end: true, result: { winner: after.win ? me : null } } : null);
      return;
    }
    apply(players[turn], { col: col });
    if (mode === "solo" && !over) setTimeout(bot, 450);
  }

  function playerIndex(who) { var i = players.indexOf(who); return i < 0 ? turn : i; }

  /* the one place where a disc lands: local turns, the bot and moves from the online room */
  function apply(who, move) {
    var col = move.col | 0, p = mode === "online" ? playerIndex(who) : turn;
    if (over || col < 0 || col >= COLS || board[col].length >= ROWS) return;
    board[col].push(p);
    gra.dzwiek.graj("tap");
    var line = winLine(col, board[col].length - 1, p);
    if (line || full()) {
      over = true; draw(line);
      // online: the kit shows the end screen from the room's result; locally we tell it ourselves
      if (mode !== "online") gra.koniec({ wygrana: mode === "hotseat" ? true : !!line && p === 0, tytul: line ? (mode === "hotseat" ? (p === 0 ? "Red wins" : "Yellow wins") : null) : "Draw" });
      return;
    }
    turn = 1 - turn; draw();
  }

  function simulate(col, p) {
    board[col].push(p);
    var win = !!winLine(col, board[col].length - 1, p), end = win || full();
    board[col].pop();
    return { win: win, end: end };
  }
  function full() { return board.every(function (c) { return c.length >= ROWS; }); }
  function at(c, r) { return c >= 0 && c < COLS && r >= 0 && r < ROWS ? board[c][r] : undefined; }
  function winLine(c, r, p) {
    var dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (var d = 0; d < dirs.length; d++) {
      var line = [[c, r]];
      for (var s = -1; s <= 1; s += 2) for (var k = 1; k < 4; k++) { var x = c + dirs[d][0] * k * s, y = r + dirs[d][1] * k * s; if (at(x, y) !== p) break; line.push([x, y]); }
      if (line.length >= 4) return line;
    }
    return null;
  }

  /* a simple bot for solo play: win if it can, block if it must, otherwise prefer the centre */
  function bot() {
    if (over || turn !== 1) return;
    var order = [3, 2, 4, 1, 5, 0, 6].filter(function (c) { return board[c].length < ROWS; });
    var pick = order.find(function (c) { return simulate(c, 1).win; });
    if (pick == null) pick = order.find(function (c) { return simulate(c, 0).win; });
    if (pick == null) pick = order[0];
    if (pick != null) apply(players[1], { col: pick });
  }

  function draw(line) {
    var mine = myTurn();
    cols.forEach(function (b, c) {
      var cells = b.children;
      for (var r = 0; r < ROWS; r++) {
        var el = cells[ROWS - 1 - r], v = board[c][r];
        if (v === undefined) delete el.dataset.p; else el.dataset.p = v;
        el.toggleAttribute("data-win", !!(line && line.some(function (q) { return q[0] === c && q[1] === r; })));
      }
      b.disabled = !mine || board[c].length >= ROWS;
    });
  }
})();
