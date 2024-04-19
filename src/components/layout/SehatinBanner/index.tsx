import { BadgeCheckIcon, Sehatin } from '@/assets/icons';
import SehatinBannerImg from '@/assets/images/sehatin-banner.png';
import SehatinBannerDesktopImg from '@/assets/images/sehatin-banner-desktop.svg';
import Image from 'next/image';

const SehatinBanner = () => {
  return (
    <div className="bg-primary-light bg-gradient-to-r from-slate-900/0 to-primary-dark/40">
      <div className="max-w-[1440px] w-full m-auto relative px-4 sm:px-6 md:px-20">
        <div className="py-4 md:py-10 w-full">
          <div className="flex md:items-center">
            <Sehatin />
          </div>
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 mt-2 md:mt-5 md:me-[376px]">
            <div>
              <span className="md:text-lg font-semibold">
                Doctor Consultation
              </span>
              <ul className="flex flex-col gap-y-1 mt-1">
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Accurate diagnosis
                </li>
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Appropriate medical advice
                </li>
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Medical certificate
                </li>
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Prescription
                </li>
              </ul>
            </div>
            <div>
              <span className="md:text-lg font-semibold">
                Medicine Delivery
              </span>
              <ul className="flex flex-col gap-y-1 mt-1">
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Fast delivery
                </li>
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> Convenient
                </li>
                <li className="flex items-center gap-x-2 text-xs md:text-sm lg:text-base text-secondary">
                  <BadgeCheckIcon /> From the nearest pharmacy
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 sm:right-6 md:right-20">
          <Image
            src={SehatinBannerDesktopImg}
            className="w-[60vw] md:w-fit object-contain absolute right-0 bottom-0 sm:w-fit md:max-h-[300px] md:-me-12 lg:me-0 sm:h-full"
            priority
            alt="Sehatin Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default SehatinBanner;
