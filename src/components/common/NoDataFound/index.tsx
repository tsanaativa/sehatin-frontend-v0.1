import NoDataFoundImg from '@/assets/images/no-data-found.svg';
import Image from 'next/image';

type NoDataFoundProps = {
  className?: string;
};

const NoDataFound = ({ className }: NoDataFoundProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${className}`}
    >
      <Image
        width={190}
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
