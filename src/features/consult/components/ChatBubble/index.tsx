import { formatTime } from '@/utils/formatter';
import React from 'react';

type ChatBubbleProps = {
  isSent?: boolean;
  createdAt: string;
  children: React.ReactNode;
};

const ChatBubble = ({ isSent, createdAt, children }: ChatBubbleProps) => {
  return (
    <div
      className={`w-full flex gap-3 items-end ${isSent && 'flex-row-reverse'}`}
    >
      <div
        className={`py-3 px-4 bg-primary-${isSent ? 'dark' : 'border'} font-semibold text-${!isSent ? 'primary-dark' : 'light'} rounded-b-2xl rounded-t${!isSent ? 'r' : 'l'}-2xl max-w-[60%] md:max-w-[45%]`}
      >
        {children}
      </div>
      <div className="text-sm text-dark-gray">{formatTime(createdAt)}</div>
    </div>
  );
};

export default ChatBubble;
