'use client';

import { CategorizeSection } from '@/components/common';
import { Doctor, Specialist } from '@/types/Doctor';
import { get } from '@/utils/api';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DoctorCard from '../DoctorCard';
import DoctorCardSkeleton from '../DoctorCardSkeleton';
import { WebSocketContext } from '@/context/WebSocketProvider';
import { WebSocketMessage } from '@/types/WebSocketMessage';
import { UserContext } from '@/context/UserProvider';

type DoctorsSectionProps = {
  specialist: Specialist;
  isAuthenticated: boolean;
};

const DoctorsSection = ({
  specialist,
  isAuthenticated,
}: DoctorsSectionProps) => {
  const { user } = useContext(UserContext);
  const { setConn } = useContext(WebSocketContext);

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);

  useEffect(() => {
    const joinRoom = () => {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/doctors/subscribe`
      );
      if (ws.OPEN) {
        ws.onmessage = (message) => {
          const m: WebSocketMessage = JSON.parse(message.data);
          if (m.type === 'doctor') {
            setShouldRefetch(!shouldRefetch);
          }
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const params = {
          specialistId: specialist.id,
          limit: 6,
        };
        const res = await get<typeof params, { doctors: Doctor[] }>(
          `/doctors/verified`,
          params
        );

        setDoctors(res.data.doctors);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, [specialist.id, shouldRefetch]);

  return (
    <CategorizeSection
      title={specialist.name}
      seeAllUrl={`/doctors/search?specialistId=${specialist.id}`}
      className="mt-6 md:mt-16"
    >
      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 min-w-max gap-3 sm:gap-4 md:gap-6 ">
          {!isLoading ? (
            <>
              {doctors.map((doctor, idx) => (
                <DoctorCard
                  key={idx}
                  width="min-w-[350px] md:min-w-[400px]"
                  doctor={doctor}
                  isAuthenticated={isAuthenticated}
                />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 2 }).map((val, idx) => (
                <DoctorCardSkeleton
                  key={idx}
                  width="min-w-[350px] md:min-w-[400px]"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </CategorizeSection>
  );
};

export default DoctorsSection;
