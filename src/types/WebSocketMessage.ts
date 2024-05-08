export type WebSocketMessage = {
  content: string;
  room_id: string;
  user_id: number;
  user_role: string;
  type: string;
};
