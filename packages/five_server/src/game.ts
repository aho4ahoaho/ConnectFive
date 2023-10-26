import { Player } from "./player";

export type GoStoneType = "black" | "white" | "empty";
export type GameStatus = "waiting" | "playing" | "finished";

export class Game {
  player1: Player;
  player2: Player | null = null;
  password: string;
  createdAt: Date;
  startedAt: Date | null = null;
  finishedAt: Date | null = null;
  board: GoStoneType[][];
  status: GameStatus = "waiting";
  turn: GoStoneType = "black";

  constructor(player1: Player, password: string, boardSize: number) {
    this.player1 = player1;
    this.password = password;
    this.createdAt = new Date();
    this.board = Array(boardSize)
      .fill(0)
      .map(() => {
        return Array(boardSize).fill("empty");
      });
  }

  putStone(x: number, y: number, stone: GoStoneType) {
    if (this.turn !== stone) {
      return false;
    }
    if (this.board[y][x] !== "empty") {
      return false;
    }
    this.board[y][x] = stone;
    this.turn = stone === "black" ? "white" : "black";
    return true;
  }

  checkWinner() {
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board.length; x++) {
        if (this.board[y][x] === "empty") continue;
        //縦
        if (
          y - 2 >= 0 &&
          y + 2 < this.board.length &&
          this.board[y][x] === this.board[y - 1][x] &&
          this.board[y][x] === this.board[y - 2][x] &&
          this.board[y][x] === this.board[y + 1][x] &&
          this.board[y][x] === this.board[y + 2][x]
        ) {
          this.status = "finished";
          return this.board[y][x];
        } else if (
          x - 2 >= 0 &&
          x + 2 < this.board.length &&
          this.board[y][x] === this.board[y][x - 1] &&
          this.board[y][x] === this.board[y][x - 2] &&
          this.board[y][x] === this.board[y][x + 1] &&
          this.board[y][x] === this.board[y][x + 2]
        ) {
          this.status = "finished";
          return this.board[y][x];
        } else if (
          y - 2 >= 0 &&
          y + 2 < this.board.length &&
          x - 2 >= 0 &&
          x + 2 < this.board.length
        ) {
          if (
            this.board[y][x] === this.board[y - 1][x - 1] &&
            this.board[y][x] === this.board[y - 2][x - 2] &&
            this.board[y][x] === this.board[y + 1][x + 1] &&
            this.board[y][x] === this.board[y + 2][x + 2]
          ) {
            this.status = "finished";
            return this.board[y][x];
          } else if (
            this.board[y][x] === this.board[y - 1][x + 1] &&
            this.board[y][x] === this.board[y - 2][x + 2] &&
            this.board[y][x] === this.board[y + 1][x - 1] &&
            this.board[y][x] === this.board[y + 2][x - 2]
          ) {
            this.status = "finished";
            return this.board[y][x];
          }
        }
      }
    }
    return null;
  }
}
