export type Player = {
  username: string;
  id: string;
  createdAt: Date;
  lastLogin: Date;
  ws?: WebSocket;
  opponent?: Player;
};
