'use client';

import Image from 'next/image';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Edit3 } from 'lucide-react';
import { useRef } from 'react';

const AvatarUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerInput = () => {
    inputRef.current?.click();
  };

  const handleChange = () => {};

  return (
    <div className="relative w-fit h-fit">
      <Image
        width={150}
        src={DefaultAvatarImg}
        className="rounded-full"
        priority
        alt="Profile"
      />
      <div className="absolute right-[0.125rem] bottom-[0.25rem]">
        <button
          className="bg-primary text-light p-1 rounded-full"
          onClick={triggerInput}
        >
          <Edit3 fill="white" size={15} />
        </button>
        <input
          ref={inputRef}
          id="avatar"
          type="file"
          accept=".png"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AvatarUploader;
