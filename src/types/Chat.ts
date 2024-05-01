export type Chat = {
  //   sender_id: number;
  //   recipient_id: number;
  timestamp: string;
  content: string;
  id: number;
  isSent: boolean;
};

export type ChatInDate = {
  date: string;
  chats: Chat[];
};
