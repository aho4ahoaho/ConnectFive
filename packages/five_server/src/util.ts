import { GoStoneType } from "./game";

export type WebSocketMessage =
  | {
      action: "putStone";
      x: number;
      y: number;
    }
  | {
      action: "gameStart";
    };

export type WebSocketMessageResponse =
  | {
      status: "ok" | "error";
      message: "waiting";
    }
  | {
      status: "ok" | "error";
      message: "gameEnd";
      board: GoStoneType[][];
      winner: GoStoneType;
    }
  | {
      status: "ok" | "error";
      message: "putStone" | "gameStart";
      turn: GoStoneType;
      board: GoStoneType[][];
    }
  | {
      status: "ok" | "error";
      message: "gameStart";
      turn: GoStoneType;
      board: GoStoneType[][];
      yourColor: GoStoneType;
      opponentName: string;
    };
