export type WebSocketMessage = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: string;
};
