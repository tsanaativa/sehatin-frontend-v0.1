'use client';

import ToggleInput from '@/components/common/ToggleInput';
import { useRef, useState } from 'react';
import toggleOnline from '../../actions/toggleOnline';
import { toast } from 'react-toastify';

type OnlineToggleProps = {
  defaultIsOnline?: boolean;
};

const OnlineToggle = ({ defaultIsOnline = false }: OnlineToggleProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(defaultIsOnline);

  const handleChange = () => {
    formRef.current?.requestSubmit();
  };

  const handleToggle = async () => {
    setChecked(!checked);
    setIsLoading(true);

    try {
      await toggleOnline();
    } catch (error) {
      setChecked(checked);
      toast.error((error as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <form ref={formRef} action={handleToggle}>
      <ToggleInput
        label="Set your online status"
        onChange={handleChange}
        disabled={isLoading}
        checked={checked}
      />
    </form>
  );
};

export default OnlineToggle;
