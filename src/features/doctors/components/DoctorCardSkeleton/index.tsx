import Skeleton from '@/components/common/Skeleton';
import React from 'react';

type DoctorCardSkeletonProps = {
  isMini?: boolean;
  width?: string;
};

const DoctorCardSkeleton = ({ isMini, width }: DoctorCardSkeletonProps) => {
  return (
    <Skeleton>
      {isMini ? (
        <div
          className={`p-3 border-2 border-primary-border rounded-lg flex flex-col items-center gap-1 ${width}`}
        >
          <div className="relative w-fit h-fit">
            <div className="bg-gray-light object-cover rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20"></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-poppins font-medium text-dark line-clamp-1 bg-gray-light w-full md:max-w-[250px] lg:max-w-full">
              <span className="invisible">Doctor</span>
            </span>
            <div className="bg-gray-light w-[50%]">
              <span className="invisible">Specialist</span>
            </div>
          </div>
          <div className="bg-gray-light w-[96.6px] h-[36px]"></div>
        </div>
      ) : (
        <div
          className={`p-3 flex gap-3 border-2 border-primary-border rounded-lg w-full ${width}`}
        >
          <div className="bg-gray-light rounded w-16 h-16 sm:min-w-20 sm:min-h-20 md:min-w-24 md:min-h-24"></div>
          <div className="w-full flex flex-col gap-1">
            <div className="flex justify-between items-center gap-2">
              <span className="font-poppins font-medium text-dark line-clamp-1 bg-gray-light font-poppins font-medium text-dark max-w-[200px] line-clamp-1 md:max-w-[250px] lg:max-w-full md:text-lg">
                <span className="invisible">Doctor</span>
              </span>
              <div className="bg-gray-light h-[24px] md:h-[28px]">
                <span className="invisible">• Offline</span>
              </div>
            </div>
            <div className="bg-gray-light w-[50%] text-sm md:text-base">
              <span className="invisible">Specialist</span>
            </div>
            <div className="bg-gray-light h-[24px] md:h-[28px]"></div>
            <div className="flex justify-between items-center mt-3">
              <div className="bg-gray-light flex items-center font-poppins font-medium text-secondary  md:text-sm lg:text-base">
                <span className="invisible">Fee</span>
              </div>
              <div className="bg-gray-light w-[96.6px] h-[32px] md:h-[36px]"></div>
            </div>
          </div>
        </div>
      )}
    </Skeleton>
  );
};

export default DoctorCardSkeleton;
