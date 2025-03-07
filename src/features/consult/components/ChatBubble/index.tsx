import { Button } from '@/components/common';
import { formatTime } from '@/utils/formatter';
import Link from 'next/link';
import React from 'react';
import AddToCartButton from '../AddToCartButton';
import Image from 'next/image';

type ChatBubbleProps = {
  isSent?: boolean;
  createdAt: string;
  children: string;
  type?: string;
  isFromUser?: boolean;
  role?: string;
};

const ChatBubble = ({
  isSent,
  createdAt,
  children,
  type,
  isFromUser,
  role,
}: ChatBubbleProps) => {
  return (
    <div
      className={`w-full flex gap-3 items-end ${isSent && 'flex-row-reverse'}`}
    >
      <div
        className={`py-3 px-4 bg-primary-${isFromUser ? 'dark' : 'border'} font-semibold text-${!isFromUser ? 'primary-dark' : 'light'} rounded-b-2xl rounded-t${!isSent ? 'r' : 'l'}-2xl max-w-[60%] md:max-w-[45%]`}
      >
        {type !== 'certificate' && type !== 'prescription' ? (
          <>
            {type !== 'file' ? (
              <>{children}</>
            ) : (
              <div>
                {children.split('.')[-1] === 'pdf' ? (
                  <>
                    Sent a file.{' '}
                    <Link href={children} target="_blank" className="underline">
                      View
                    </Link>
                  </>
                ) : (
                  <Image
                    src={children}
                    alt=""
                    className="rounded object-cover"
                    width={100}
                    height={100}
                  />
                )}
              </div>
            )}
          </>
        ) : (
          <>
            Doctor has{' '}
            {type === 'certificate'
              ? 'created medical certificate'
              : 'prescribed medicine'}
            .
            <div className="my-2 flex flex-col gap-3">
              <Link href={children} target="_blank">
                <Button className="w-full">View</Button>
              </Link>
              {type === 'prescription' && role === 'user' && (
                <AddToCartButton />
              )}
            </div>
          </>
        )}
      </div>
      <div className="text-sm text-dark-gray">{formatTime(createdAt)}</div>
    </div>
  );
};

export default ChatBubble;
