'use client';

import ToggleInput from '@/components/common/ToggleInput';
import { useContext, useEffect, useRef, useState } from 'react';
import toggleOnline from '../../actions/toggleOnline';
import { toast } from 'react-toastify';
import { WebSocketContext } from '@/context/WebSocketProvider';

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
      sendMessage();
    } catch (error) {
      setChecked(checked);
      toast.error((error as Error).message);
    }

    setIsLoading(false);
  };

  const { conn, setConn } = useContext(WebSocketContext);

  useEffect(() => {
    const joinRoom = () => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/doctors/subscribe`
      );
      if (ws.OPEN) {
        ws.onmessage = (message) => {
          console.log('Received...');
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

    joinRoom();
  }, [setConn]);

  const sendMessage = () => {
    const msgToSend = {
      content: '',
      type: 'doctor',
    };

    if (conn !== null) {
      conn.send(JSON.stringify(msgToSend));
    }
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
