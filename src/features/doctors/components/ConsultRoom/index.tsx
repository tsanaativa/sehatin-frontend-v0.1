'use client';

import { Badge, Button, Input } from '@/components/common';
import { DUMMY_USER } from '@/constants/dummy';
import { WebsocketContext } from '@/context/WebsocketProvider';
import { Chat } from '@/types/Chat';
import { formatDate } from '@/utils/formatter';
import { Paperclip } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBubble from '../ChatBubble';

export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
};

const ConsultRoom = () => {
  const user = DUMMY_USER;
  const { id } = useParams();
  const router = useRouter();
  const { conn, setConn } = useContext(WebsocketContext);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const joinRoom = (roomId: string) => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/joinRoom/${roomId}?userId=${user.id}&username=${user.email}`
      );
      if (ws.OPEN) {
        ws.onmessage = (message) => {
          const m: Message = JSON.parse(message.data);

          const rcvMsg: Chat = {
            content: m.content,
            timestamp: new Date().toISOString(),
            id: 1,
            isSent: user?.email == m.username,
          };
          setChats((prev) => [...prev, rcvMsg]);

          scrollToBottom();
        };

        ws.onclose = () => {
          console.log('Closed...');
        };
        ws.onerror = () => {
          console.log('Error!');
        };
        ws.onopen = () => {
          console.log('Opened..');
        };

        setConn(ws);
      }
    };

    const roomId = `${user.email}-${id}`;
    joinRoom(roomId);
  }, [id, setConn, user.email, user.id]);

  const sendMessage = () => {
    const message = messageRef.current?.value;
    if (message && message !== '') {
      if (conn !== null) {
        conn.send(message);
      }
    }

    if (messageRef.current) messageRef.current.value = '';

    scrollToBottom();
  };

  const messageRef = useRef<HTMLInputElement>(null);

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && messageRef.current) {
      sendMessage();
    }
  }

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-7rem)] md:h-[75vh] md:border md:border-gray-light md:rounded">
      <div
        className="w-full h-full overflow-x-hidden overflow-y-auto max-h-full md:pt-6 md:px-7"
        ref={chatBoxRef}
      >
        <div className=" flex flex-col gap-5 items-center">
          <div className="rounded border border-primary-dark bg-primary-light p-5 w-full flex flex-col items-center">
            <p className="text-primary-dark font-semibold md:text-lg">
              Consultation Starts!
            </p>
            <p className="text-dark-gray text-sm">
              You can consult your problem to the doctor
            </p>
          </div>
          {chats.map((chat, idx) => (
            <React.Fragment key={idx}>
              {(idx === 0 ||
                new Date(chats[idx - 1].timestamp).toDateString() !==
                  new Date(chat.timestamp).toDateString()) && (
                <div className="w-fit" key={idx}>
                  <Badge variant="gray">{formatDate(chat.timestamp)}</Badge>
                </div>
              )}
              <div className="flex flex-col gap-5 w-full">
                <ChatBubble
                  isSent={chat.isSent}
                  timestamp={chat.timestamp}
                  key={idx}
                >
                  {chat.content}
                </ChatBubble>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="w-full bg-light py-3 bottom-0 flex items-center gap-4 md:p-7">
        <div className="relative w-full">
          <Input
            ref={messageRef}
            type="text"
            placeholder="Enter message..."
            className="w-full"
            onKeyUp={handleKeyUp}
          />
          <label
            htmlFor="attach"
            role="button"
            className="text-dark-gray absolute right-3 bottom-[calc(50%-0.75rem)]"
          >
            <Paperclip />
            <input id="attach" type="file" className="hidden" />
          </label>
        </div>
        <Button className="px-6 h-full py-4" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ConsultRoom;
