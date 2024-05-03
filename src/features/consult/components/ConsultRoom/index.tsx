'use client';

import { Badge, Button, Input } from '@/components/common';
import { WebsocketContext } from '@/context/WebsocketProvider';
import { Chat } from '@/types/Chat';
import { User } from '@/types/User';
import { formatDate } from '@/utils/formatter';
import { Paperclip } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBubble from '../ChatBubble';
import ConsultBar from '../ConsultBar';

export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: string;
};

type ConsultRoomProps = {
  user: User;
};

const ConsultRoom = ({ user }: ConsultRoomProps) => {
  const { id } = useParams();
  const { conn, setConn } = useContext(WebsocketContext);

  const [chats, setChats] = useState<Chat[]>([]);

  var typingInterval = 1250;
  var typingTimer: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    const joinRoom = (roomId: string) => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/join-room/${roomId}?userId=${user.id}&username=${user.email}`
      );
      if (ws.OPEN) {
        ws.onmessage = (message) => {
          const m: Message = JSON.parse(message.data);
          const isSent = user?.email === m.username;
          if (m.type === 'text' || m.type === 'file') {
            const rcvMsg: Chat = {
              content: m.content,
              timestamp: new Date().toISOString(),
              id: 1,
              isSent: isSent,
              type: m.type,
            };

            setChats((prev) => [...prev, rcvMsg]);
          } else if (m.type === 'typing') {
            if (!isSent) {
              setIsTyping(m.content === 'true');
            }
          }
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
    const msgToSend = {
      content: message,
      type: 'text',
    };

    if (message && message !== '') {
      if (conn !== null) {
        conn.send(JSON.stringify(msgToSend));
      }
    }

    if (messageRef.current) messageRef.current.value = '';
  };

  const [isTyping, setIsTyping] = useState(false);

  const typing = () => {
    const msgToSend = {
      content: 'true',
      type: 'typing',
    };
    if (conn !== null) {
      clearInterval(typingTimer);
      typingTimer = setTimeout(doneTyping, typingInterval);
      conn.send(JSON.stringify(msgToSend));
    }
  };

  function doneTyping() {
    const msgToSend = {
      content: 'false',
      type: 'typing',
    };
    if (conn !== null) conn.send(JSON.stringify(msgToSend));
  }

  const messageRef = useRef<HTMLInputElement>(null);

  function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (messageRef.current) {
        sendMessage();
      }
    } else {
      typing();
    }
  }

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      <div className="hidden md:block">
        <ConsultBar isTyping={isTyping} />
      </div>
      <div className="relative w-full">
        <div className="flex bg-light sticky top-0 w-[calc(100%+2rem)] -mt-3 pb-3 px-3 -ms-4 border-b border-gray-light md:hidden">
          <ConsultBar isTyping={isTyping} />
        </div>
        <div className="flex flex-col w-full h-[calc(100vh-10.5rem)] md:h-[75vh] md:border md:border-gray-light md:rounded">
          <div
            className="w-full h-full overflow-x-hidden overflow-y-auto max-h-full md:pt-6 md:px-7"
            ref={chatBoxRef}
          >
            <div className="mt-3 flex flex-col gap-5 items-center md:mt-0">
              {chats.map((chat, idx) => (
                <React.Fragment key={idx}>
                  {(idx === 0 ||
                    new Date(chats[idx - 1].timestamp).toDateString() !==
                      new Date(chat.timestamp).toDateString()) && (
                    <div className="w-fit" key={idx}>
                      <Badge variant="gray">{formatDate(chat.timestamp)}</Badge>
                    </div>
                  )}
                  <div className="flex flex-col gap-5 w-full bubble">
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
      </div>
    </>
  );
};

export default ConsultRoom;
