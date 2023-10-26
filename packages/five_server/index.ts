import Express from "express";
import expressWs from "express-ws";
import { Player } from "./src/player";
import crypto from "crypto";
import { Game, GoStoneType } from "./src/game";
import { WebSocketMessage, WebSocketMessageResponse } from "./src/util";
import e from "express";

const PORT = process.env.PORT || 3001;
const OriginApp = Express();
const expressWsApp = expressWs(OriginApp);
const { app } = expressWsApp;

app.use(Express.json());
app.use((req, res, next) => {
  console.log(req.method, req.url);
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const Players: Player[] = [];
const Games: Game[] = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/debug/clear", (req, res) => {
  console.log("clear");
  Players.forEach((p) => {
    p.ws?.close();
  });
  Players.splice(0, Players.length);
  Games.splice(0, Games.length);
  res.send("clear");
});

app.get("/register", (req, res) => {
  const name = String(req.query.name);
  if (name === "") {
    res.status(400).send("Name is required");
    return;
  }
  const player: Player = {
    username: name,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    lastLogin: new Date(),
  };
  Players.push(player);
  res.send(player);
});

app.get("/session", (req, res) => {
  const id = String(req.query.id);
  const password = String(req.query.password);

  if (id === "" || password === "") {
    res.status(400).send("id and password are required");
    return;
  }

  //プレイヤーを探す
  const player = Players.find((p) => p.id === id);
  if (player) {
    player.lastLogin = new Date();
  } else {
    res.status(400).send("Player not found");
    return;
  }

  //ゲームを探す
  const game = Games.find((g) => g.password === password);
  if (game) {
    //ゲームがある場合は追加
    if (game.player2 == null) {
      game.player2 = player;
    } else {
      res.status(400).send("Game is full");
      return;
    }
  } else {
    const newGame = new Game(player, password, 13);
    Games.push(newGame);
  }
  res.send({
    status: "ok",
    player,
    password: password,
  });
});

app.ws("/game", (ws, req) => {
  const id = String(req.query.id);
  const password = String(req.query.password);

  if (id === "" || password === "") {
    ws.send("id and password are required");
    ws.close();
    return;
  }

  const player = Players.find((p) => p.id === id);
  const game = Games.find((g) => g.password === password);

  if (!player || !game) {
    ws.send("Player or Game not found");
    ws.close();
    return;
  }

  if (game.player1.id !== player.id && game.player2?.id !== player.id) {
    ws.send("You are not a player of this game");
    ws.close();
    return;
  }

  let turn: GoStoneType = "black";
  if (game.player1.id === player.id) {
    game.player1.ws = ws;
    if (game.player2 == null) {
      const res: WebSocketMessageResponse = {
        status: "ok",
        message: "waiting",
      };
      ws.send(JSON.stringify(res));
    }
  }
  if (game.player2?.id === player.id) {
    game.player2.ws = ws;
    game.player2.opponent = game.player1;
    game.player1.opponent = game.player2;

    turn = "white";
    let res = {
      status: "ok",
      message: "gameStart",
      turn: game.turn,
      board: game.board,
    };
    ws.send(
      JSON.stringify({
        ...res,
        yourColor: "white",
        opponentName: game.player1.username,
      })
    );
    player.opponent?.ws?.send(
      JSON.stringify({
        ...res,
        yourColor: "black",
        opponentName: game.player2.username,
      })
    );
  }

  ws.on("message", (msg: any) => {
    const data = JSON.parse(String(msg)) as WebSocketMessage;
    console.log(turn, data);
    switch (data.action) {
      case "putStone":
        const s = game.putStone(data.x, data.y, turn);
        const res: WebSocketMessageResponse = {
          status: s ? "ok" : "error",
          message: "putStone",
          turn: game.turn,
          board: game.board,
        };
        ws.send(JSON.stringify(res));
        player.opponent?.ws?.send(JSON.stringify(res));
        const winner = game.checkWinner();
        console.log(winner);
        if (winner) {
          const res: WebSocketMessageResponse = {
            status: "ok",
            message: "gameEnd",
            board: game.board,
            winner,
          };
          ws.send(JSON.stringify(res));
          player.opponent?.ws?.send(JSON.stringify(res));
          break;
        }
    }
  });
});

app.listen(3001, () => {
  console.log(`Listening on port ${PORT}!`);
});