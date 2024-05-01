'use client';

import { Badge, Button, Input } from '@/components/common';
import { Paperclip } from 'lucide-react';
import ChatBubble from '../ChatBubble';
import { DUMMY_USER, DUMMY_CHAT } from '@/constants/dummy';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { formatDate } from '@/utils/formatter';
import { Chat } from '@/types/Chat';
import { WebsocketContext } from '@/context/WebsocketProvider';
import api from '@/utils/api';
import { useRouter, useParams } from 'next/navigation';

export type Message = {
  content: string;
  client_id: string;
  username: string;
  room_id: string;
  type: 'recv' | 'self';
};

const ConsultRoom = () => {
  const user = DUMMY_USER;
  const { id } = useParams();
  const router = useRouter();
  const { conn, setConn } = useContext(WebsocketContext);

  const [chats, setChats] = useState<Chat[]>(DUMMY_CHAT);
  const [messages, setMessage] = useState<Array<Message>>([]);

  useEffect(() => {
    const joinRoom = (roomId: string) => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/joinRoom/${roomId}?userId=${user.id}&username=${user.email}`
      );
      if (ws.OPEN) {
        setConn(ws);
        console.log('helppppp');
      }
    };

    const roomId = `${user.email}-${id}`;
    joinRoom(roomId);
  }, [id, setConn, user.email, user.id]);

  useEffect(() => {
    // if (conn === null) {
    //   router.push('/')
    //   return
    // }
    async function getUsers() {
      try {
        const roomId = `${user.email}-${id}`;
        const data = await api.get(`/ws/getClients/${roomId}`);

        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
    if (conn) {
      getUsers();
    }
  }, [conn, id, router, user.email]);

  useEffect(() => {
    console.log(conn);
    if (conn !== null) {
      console.log(conn);
      conn.onmessage = (message) => {
        // console.log('Received Message: ' + evt.data);
        const m: Message = JSON.parse(message.data);
        console.log(m, 'ssss');

        user?.email == m.username ? (m.type = 'self') : (m.type = 'recv');
        setMessage([...messages, m]);
        console.log([...messages, m]);
      };

      conn.onclose = () => {
        console.log('Closed...');
      };
      conn.onerror = () => {
        console.log('Error!');
      };
      conn.onopen = () => {
        console.log('Opened..');
      };
    }
    console.log('first');
  }, [conn, messages, user?.email]);

  const sendMessage = () => {
    const message = messageRef.current?.value;
    if (message && message !== '') {
      console.log(conn);
      if (conn !== null) {
        conn.send(message);
        console.log('sending');
        const sentMsg: Chat = {
          sender_id: 1,
          recipient_id: 1,
          content: message,
          timestamp: new Date().toISOString(),
          id: 1,
        };
        // ws.send(
        //   JSON.stringify({
        //     ...sentMsg,
        //     type: 'message',
        //   })
        // );
        setChats((prev) => [...prev, sentMsg]);
      }
    }

    if (messageRef.current) messageRef.current.value = '';

    scrollToBottom();
  };

  // const receiveMessage = (data) => {
  //   console.log(typeof data);
  //   // const newChat = {
  //   //   data
  //   // }
  //   // setChats(prev => [
  //   //   ...prev,
  //   //   newChat
  //   // ])
  // };

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
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] md:h-[75vh] md:border md:border-gray-light md:rounded">
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
                  isSent={chat.sender_id === user.id}
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
      <div className=" w-full bg-light p-5 bottom-0 flex items-center gap-4">
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
