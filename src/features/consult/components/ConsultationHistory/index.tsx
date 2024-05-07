'use client';

import MenuTabs from '@/components/common/MenuTabs';
import OnlineToggle from '@/features/doctors/components/OnlineToggle';
import { getConsultations } from '@/services/consultation';
import { Consultation, ConsultationParams } from '@/types/Consultation';
import { PaginationInfo } from '@/types/PaginationInfo';
import { User } from '@/types/User';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import ConsultationCard from '../ConsultationCard';
import { Badge, Button, NoDataFound, Skeleton } from '@/components/common';

type ConsultationHistoryProps = {
  user: User;
};

const ConsultationHistory = ({ user }: ConsultationHistoryProps) => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>();
  const [searchParams, setSearchParams] = useState<ConsultationParams>({
    page: 1,
    limit: 10,
    status: 'all',
  });

  const options = ['all', 'ongoing', 'completed'];
  const [selected, setSelected] = useState(options[0]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  if (!user) {
    redirect('/login');
  }

  const handleSelect = (selected: string) => {
    setSelected(selected);
    setSearchParams({
      ...searchParams,
      page: 1,
      status: selected,
    });
  };

  useEffect(() => {
    const fetchConsultations = async () => {
      if (searchParams.page > 1) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      const res = await getConsultations(user.role, searchParams);
      setPaginationInfo(res.pagination_info);

      if (searchParams.page > 1) {
        setConsultations((prev) => [...prev, ...res.consultations]);
        setIsLoadingMore(false);
      } else {
        setConsultations(res.consultations);
      }
      setIsLoading(false);
    };

    fetchConsultations();
  }, [searchParams, user]);

  const loadMore = async () => {
    setSearchParams({
      ...searchParams,
      page: searchParams.page + 1,
    });
  };

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
          My Consultation History
        </h2>
        {user.role === 'doctor' && (
          <OnlineToggle defaultIsOnline={user.is_online} />
        )}
      </div>
      <MenuTabs options={options} selected={selected} onSelect={handleSelect} />
      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((val, idx) => (
            <Skeleton key={idx}>
              <div className="border border-primary-border rounded-lg cursor-pointer">
                <div className="flex justify-between gap-x-4 p-4 border-b border-primary-border">
                  <div className="h-fit w-fit">
                    <div className="bg-gray-light rounded-full w-20 h-20"></div>
                  </div>
                  <div className="flex justify-between w-full h-fit">
                    <div className=" flex flex-col gap-1 w-full">
                      <span className="w-fit bg-gray-light font-poppins font-medium text-xs text-dark md:text-lg">
                        <span className="invisible">doctor name</span>
                      </span>
                      <span className="w-fit font-medium text-dark-gray bg-gray-light">
                        <span className="invisible w-full md:min-w-[200px]">
                          patient data
                        </span>
                      </span>
                      <span className="w-full max-w-[200px] bg-gray-light font-medium text-dark-gray text-xs text-dark md:text-sm">
                        <span className="invisible">Ended at</span>
                      </span>
                    </div>
                    <div className="bg-gray-light flex flex-col justify-between min-w-[100px] h-fit">
                      <Badge className="invisible">Status</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between p-4">
                  <div className="flex gap-2">
                    <div className="bg-gray-light py-5 px-3 md:min-w-[100px]"></div>
                    <div className="bg-gray-light py-5 px-3 md:min-w-[100px]"></div>
                  </div>
                  <div className="bg-gray-light py-5 px-3 md:min-w-[100px]"></div>
                </div>
              </div>
            </Skeleton>
          ))}
        </div>
      ) : (
        <>
          {consultations.length > 0 ? (
            <div className="flex flex-col gap-3">
              {consultations.map((consultation, idx) => (
                <ConsultationCard
                  key={idx}
                  consultation={consultation}
                  isDoctor={user.role === 'user'}
                />
              ))}
              {paginationInfo &&
                consultations.length < paginationInfo?.total_data && (
                  <div className="flex w-full justify-center">
                    <Button
                      className="w-full my-6 md:text-lg md:max-w-[300px] flex justify-center"
                      variant="outlined-primary"
                      onClick={loadMore}
                      loading={isLoadingMore}
                    >
                      Load More
                    </Button>
                  </div>
                )}
            </div>
          ) : (
            <NoDataFound />
          )}
        </>
      )}
    </>
  );
};

export default ConsultationHistory;
