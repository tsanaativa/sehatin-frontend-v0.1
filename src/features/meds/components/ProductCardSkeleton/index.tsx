import Skeleton from '@/components/common/Skeleton';
import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <Skeleton>
      <div className="w-fit border border-primary-border rounded min-w-[197.2px] overflow-hidden md:w-full">
        <div className="h-[96px] w-full bg-gray-light"></div>
        <div className="flex flex-col gap-5 pt-2 pb-3 px-2 md:px-3">
          <div className="flex flex-col gap-2">
            <div className="h-[20px] w-full bg-gray-light"></div>
            <div className="h-[20px] w-[50%] bg-gray-light"></div>
          </div>
          <div className="h-[30px] w-full bg-gray-light"></div>
          <div className="h-[36px] w-[173.2px] bg-gray-light"></div>
        </div>
      </div>
    </Skeleton>
  );
};

export default ProductCardSkeleton;
