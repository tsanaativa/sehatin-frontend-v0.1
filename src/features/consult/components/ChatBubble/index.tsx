import { Button } from '@/components/common';
import { formatTime } from '@/utils/formatter';
import Link from 'next/link';
import React from 'react';
import AddToCartButton from '../AddToCartButton';

type ChatBubbleProps = {
  isSent?: boolean;
  createdAt: string;
  children: string;
  type?: string;
  isFromUser?: boolean;
};

const ChatBubble = ({
  isSent,
  createdAt,
  children,
  type,
  isFromUser,
}: ChatBubbleProps) => {
  return (
    <div
      className={`w-full flex gap-3 items-end ${isSent && 'flex-row-reverse'}`}
    >
      <div
        className={`py-3 px-4 bg-primary-${isFromUser ? 'dark' : 'border'} font-semibold text-${!isFromUser ? 'primary-dark' : 'light'} rounded-b-2xl rounded-t${!isSent ? 'r' : 'l'}-2xl max-w-[60%] md:max-w-[45%]`}
      >
        {type !== 'certificate' && type !== 'prescription' ? (
          <>{children}</>
        ) : (
          <>
            Doctor has{' '}
            {type === 'certificate'
              ? 'created medical certificate'
              : 'prescribed your medicine'}
            .
            <div className="my-2">
              <Link href={children} target="_blank">
                <Button className="w-full">View</Button>
              </Link>
              {type === 'prescription' && <AddToCartButton />}
            </div>
          </>
        )}
      </div>
      <div className="text-sm text-dark-gray">{formatTime(createdAt)}</div>
    </div>
  );
};

export default ChatBubble;
