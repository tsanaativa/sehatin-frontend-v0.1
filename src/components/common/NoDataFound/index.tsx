import NoDataFoundImg from '@/assets/images/no-data-found.svg';
import Image from 'next/image';

const NoDataFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Image
        width={150}
        src={NoDataFoundImg}
        className="rounded-full"
        priority
        alt="Profile"
      />
      <span className="text-dark-gray">No data found</span>
    </div>
  );
};

export default NoDataFound;
