import PageNotFoundErrImg from '@/assets/images/not-found-404.svg';
import { Button } from '@/components/common';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center px-5">
      <div className="flex flex-col items-center gap-10 py-5 w-full max-w-[700px]">
        <div className="w-full">
          <Image
            width={150}
            height={150}
            src={PageNotFoundErrImg}
            className="object-cover h-full w-full"
            priority
            alt="500"
          />
        </div>
        <Button
          variant="outlined-gray"
          className="px-5 w-full md:w-fit md:px-16"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
