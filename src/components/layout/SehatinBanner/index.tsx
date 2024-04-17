import { BadgeCheckIcon, Sehatin } from '@/assets/icons';
import SehatinBannerImg from '@/assets/images/sehatin-banner.png';
import Image from 'next/image';

const SehatinBanner = () => {
  return (
    <div className="bg-primary-light bg-gradient-to-r from-slate-900/0 to-primary-dark/40 px-4 relative sm:px-6">
      <div className="py-4">
        <Sehatin />
        <div className="mt-3">
          <span>Doctor Consultation</span>
          <ul className="flex flex-col gap-y-1">
            <li className="flex items-center gap-x-2 text-[0.625rem]">
              <BadgeCheckIcon /> Accurate diagnosis
            </li>
            <li className="flex items-center gap-x-2 text-[0.625rem]">
              <BadgeCheckIcon /> Appropriate medical advice
            </li>
            <li className="flex items-center gap-x-2 text-[0.625rem]">
              <BadgeCheckIcon /> Medical certificate
            </li>
            <li className="flex items-center gap-x-2 text-[0.625rem]">
              <BadgeCheckIcon /> Prescription
            </li>
          </ul>
        </div>
        <div className="mt-2">
          <span>Medicine Delivery</span>
          <ul className="flex flex-col gap-y-1">
            <li className="flex items-center gap-x-2 text-[10px]">
              <BadgeCheckIcon /> Fast delivery
            </li>
            <li className="flex items-center gap-x-2 text-[10px]">
              <BadgeCheckIcon /> Convenient
            </li>
            <li className="flex items-center gap-x-2 text-[10px]">
              <BadgeCheckIcon /> From the nearest pharmacy
            </li>
          </ul>
        </div>
      </div>
      <div className="absolute inset-0">
        <Image
          src={SehatinBannerImg}
          className="w-[70vw] object-contain absolute right-0 bottom-0 sm:w-fit sm:h-full"
          priority
          alt="Sehatin Banner"
        />
      </div>
    </div>
  );
};

export default SehatinBanner;
