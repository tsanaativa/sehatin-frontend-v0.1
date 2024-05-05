import WebSocketProvider from '@/context/WebSocketProvider';
import { getUser } from '@/services/session';

const ConsultLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] max-w-[1440px] flex justify-center md:min-h-fit">
      <div className="w-full flex gap-6 pt-6 pb-8 px-4 max-w-[1150px] sm:px-6 md:py-12">
        <WebSocketProvider>{children}</WebSocketProvider>
      </div>
    </div>
  );
};

export default ConsultLayout;
