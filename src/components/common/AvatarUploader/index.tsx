'use client';

import Image from 'next/image';
import DefaultAvatarImg from '@/assets/images/default-avatar.svg';
import { Edit3 } from 'lucide-react';
import React, { useRef, useState } from 'react';

type AvatarUploaderProps = {
  defaultAvatar?: string;
  onChange?: (file: File) => void;
};

const AvatarUploader = ({ defaultAvatar, onChange }: AvatarUploaderProps) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerInput = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
      if (onChange) onChange(e.target.files[0]);
    }
  };

  return (
    <div className="relative w-fit h-fit">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <Image
          width={150}
          height={150}
          src={avatar ? avatar : DefaultAvatarImg}
          className="object-cover h-full w-full"
          priority
          alt="Profile"
        />
      </div>
      <div className="absolute right-[0.5rem] bottom-[0.25rem]">
        <button
          type="button"
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
