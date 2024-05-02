'use client';

import InternalServerErrImg from '@/assets/images/server-error-500.svg';
import { Button } from '@/components/common';
import Image from 'next/image';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const renderError = () => {
    return (
      <div className="flex flex-col items-center gap-10 py-5 w-full max-w-[700px]">
        <div className="w-full">
          <Image
            width={150}
            height={150}
            src={InternalServerErrImg}
            className="object-cover h-full w-full"
            priority
            alt="500"
          />
        </div>
        <Button
          variant="outlined-gray"
          className="px-5 w-full md:w-fit md:px-16"
          onClick={reset}
        >
          Try Again
        </Button>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center gap-6  flex-col bg-white">
      {renderError()}
    </div>
  );
}
