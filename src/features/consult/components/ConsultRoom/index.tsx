'use client';

import { Badge, Button, Input } from '@/components/common';
import { WebSocketContext } from '@/context/WebSocketProvider';
import { Chat } from '@/types/Chat';
import { formatDate, formatDateTime } from '@/utils/formatter';
import { Paperclip } from 'lucide-react';
import { redirect, useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBubble from '../ChatBubble';
import ConsultBar from '../ConsultBar';
import { WebSocketMessage } from '@/types/WebSocketMessage';
import { User } from '@/types/User';
import { Consultation } from '@/types/Consultation';
import { getConsultation } from '@/services/consultation';
import { toast } from 'react-toastify';
import { createChat } from '../../actions/consultation';

type ConsultRoomProps = {
  user?: User;
};

const ConsultRoom = ({ user }: ConsultRoomProps) => {
  if (!user) {
    redirect('/');
  }

  const { id } = useParams();
  const router = useRouter();
  const { conn, setConn } = useContext(WebSocketContext);

  const [consultation, setConsultation] = useState<Consultation>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [isEnded, setIsEnded] = useState(false);
  const [hasCertificate, setHasCertificate] = useState(false);
  const [hasPrescription, setHasPrescription] = useState(false);

  let typingInterval = 1250;
  let typingTimer: string | number | NodeJS.Timeout | undefined;

  useEffect(() => {
    const joinRoom = () => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/${user.role}s/${user.id}/consultations/${id}/rooms`
      );
      if (ws.OPEN) {
        ws.onmessage = (message) => {
          const m: WebSocketMessage = JSON.parse(message.data);
          console.log(m);
          const isSent = m.user_role === 'user';
          if (
            m.type === 'text' ||
            m.type === 'file' ||
            m.type === 'certificate' ||
            m.type === 'prescription'
          ) {
            var tzoffset = new Date().getTimezoneOffset() * 60000;
            var localISOTime = new Date(Date.now() - tzoffset)
              .toISOString()
              .slice(0, -1);
            const rcvMsg: Chat = {
              content: m.content,
              created_at: localISOTime + 'Z',
              id: 1,
              is_from_user: isSent,
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

    const fetchConsultation = async () => {
      try {
        const consultation = await getConsultation(user.role, `${id}`);
        setConsultation(consultation);
        setIsEnded(!!consultation.ended_at);
        setHasCertificate(!!consultation.certificate_url);
        setHasPrescription(!!consultation.prescription_url);
        setChats(consultation.chats);

        if (consultation) {
          joinRoom();
        }
      } catch (err) {
        toast.error((err as Error).message);
        router.back();
      }
    };

    fetchConsultation();
  }, [id, router, setConn, user]);

  const sendMessage = () => {
    const message = messageRef.current?.value;
    const msgToSend = {
      content: message,
      type: 'text',
    };

    if (message && message !== '') {
      if (conn !== null) {
        conn.send(JSON.stringify(msgToSend));
        createChat(`${id}`, user.role, msgToSend);
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

  const doneTyping = () => {
    const msgToSend = {
      content: 'false',
      type: 'typing',
    };
    if (conn !== null) conn.send(JSON.stringify(msgToSend));
  };

  const messageRef = useRef<HTMLInputElement>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (messageRef.current) {
        sendMessage();
      }
    } else {
      typing();
    }
  };

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const notifyCert = (url: string) => {
    const msgToSend = {
      content: url,
      type: 'certificate',
    };

    if (conn !== null) {
      conn.send(JSON.stringify(msgToSend));
      createChat(`${id}`, user.role, msgToSend);
    }

    if (consultation)
      setConsultation({
        ...consultation,
        certificate_url: url,
      });
  };

  const notifyPrescription = (url: string) => {
    const msgToSend = {
      content: url,
      type: 'prescription',
    };

    if (url && url !== '') {
      if (conn !== null) {
        conn.send(JSON.stringify(msgToSend));
        createChat(`${id}`, user.role, msgToSend);
      }
    }

    if (consultation)
      setConsultation({
        ...consultation,
        prescription_url: url,
      });
  };

  const notifyEnd = () => {
    const msgToSend = {
      content: 'in 30',
      type: 'end',
    };

    if (conn !== null) {
      conn.send(JSON.stringify(msgToSend));
    }

    if (consultation)
      setConsultation({
        ...consultation,
        ended_at: new Date().toISOString(),
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <>
      {consultation ? (
        <>
          <div className="hidden md:block">
            <ConsultBar
              isTyping={isTyping}
              consultation={consultation}
              isDoctor={user.role === 'user'}
              notifyCert={notifyCert}
              notifyPrescription={notifyPrescription}
              notifyEnd={notifyEnd}
            />
          </div>
          <div className="relative w-full">
            <div className="flex bg-light sticky top-0 w-[calc(100%+2rem)] -mt-3 pb-3 px-3 -ms-4 border-b border-gray-light md:hidden">
              <ConsultBar
                isTyping={isTyping}
                consultation={consultation}
                isDoctor={user.role === 'user'}
                notifyCert={notifyCert}
                notifyPrescription={notifyPrescription}
                notifyEnd={notifyEnd}
              />
            </div>
            <div className="flex flex-col w-full h-[calc(100vh-10.5rem)] md:h-[75vh] md:border md:border-gray-light md:rounded">
              <div
                className="w-full h-full overflow-x-hidden overflow-y-auto max-h-full md:pt-6 md:px-7"
                ref={chatBoxRef}
              >
                {chats && (
                  <div className="mt-3 flex flex-col gap-5 items-center md:mt-0">
                    {chats.map((chat, idx) => (
                      <React.Fragment key={idx}>
                        {(idx === 0 ||
                          new Date(chats[idx - 1].created_at).toDateString() !==
                            new Date(chat.created_at).toDateString()) && (
                          <div className="w-fit" key={idx}>
                            <Badge variant="gray">
                              {formatDate(chat.created_at)}
                            </Badge>
                          </div>
                        )}
                        <div className="flex flex-col gap-5 w-full bubble">
                          <ChatBubble
                            isSent={
                              user.role === 'user'
                                ? chat.is_from_user
                                : !chat.is_from_user
                            }
                            createdAt={chat.created_at}
                            key={idx}
                            type={chat.type}
                            isFromUser={chat.is_from_user}
                          >
                            {chat.content}
                          </ChatBubble>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
              {!isEnded ? (
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
              ) : (
                <div className="flex justify-center py-1 bg-gray-light text-dark-gray text-sm">
                  Chat ended
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center text-gray h-[calc(100vh-10.5rem)] md:h-[75vh]">
          Loading...
        </div>
      )}
    </>
  );
};

export default ConsultRoom;
