'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import EndChatButton from '../EndChatButton';
import { EllipsisVertical } from 'lucide-react';

type ConsultDropdownProps = {
  onEndChat: () => void;
};

const ConsultDropdown = ({ onEndChat }: ConsultDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  return (
    <div className="relative cursor-pointer">
      <div onClick={() => setShowDropdown(true)}>
        <EllipsisVertical />
      </div>
      <div
        className={`mt-2 min-w-40 absolute right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
        ref={ref}
      >
        <EndChatButton onConfirm={onEndChat} />
      </div>
    </div>
  );
};

export default ConsultDropdown;
