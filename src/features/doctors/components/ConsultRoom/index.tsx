import { Badge, Button, Input } from '@/components/common';
import { Paperclip } from 'lucide-react';
import ChatBubble from '../ChatBubble';
import { DUMMY_USER, DUMMY_CHAT } from '@/constants/dummy';
import React from 'react';
import { formatDate } from '@/utils/formatter';

const ConsultRoom = () => {
  const user = DUMMY_USER;

  return (
    <div className="relative flex flex-col gap-5 items-center overflow-y-auto md:min-h-[75vh]">
      <div className="rounded border border-primary-dark bg-primary-light p-5 w-full flex flex-col items-center">
        <p className="text-primary-dark font-semibold md:text-lg">
          Consultation Starts!
        </p>
        <p className="text-dark-gray text-sm">
          You can consult your problem to the doctor
        </p>
      </div>
      {DUMMY_CHAT.map((date, idx) => (
        <React.Fragment key={idx}>
          <div className="w-fit" key={idx}>
            <Badge variant="gray">{formatDate(date.date)}</Badge>
          </div>
          <div className="flex flex-col gap-5 w-full">
            {date.chats.map((chat, idx) => (
              <ChatBubble
                isSent={chat.sentBy === user.id}
                timestamp={chat.time}
                key={idx}
              >
                {chat.content}
              </ChatBubble>
            ))}
          </div>
        </React.Fragment>
      ))}
      <div className="absolute w-full bg-light bottom-0 flex items-center gap-4">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Enter message..."
            className="w-full"
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
        <Button className="px-6 h-full py-4">Send</Button>
      </div>
    </div>
  );
};

export default ConsultRoom;
