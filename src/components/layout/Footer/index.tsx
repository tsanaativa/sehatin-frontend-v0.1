import {
  FacebookIcon,
  InstagramIcon,
  SehatinWhite,
  TiktokIcon,
  TwitterIcon,
} from '@/assets/icons';

const Footer = () => {
  return (
    <div className="bg-primary-darker text-light">
      <div className="lg:max-w-[1440px] w-full m-auto px-4 pt-5 pb-28 md:pb-10 sm:px-6 md:px-20 md:pt-9">
        <div className="w-full flex justify-between flex-wrap md:flex-nowrap gap-5">
          <div className="md:max-w-[400px] lg:max-w-[500px]">
            <SehatinWhite />
            <p className="text-sm mt-3 sm:text-base lg:text-lg">
              A digital healthcare solution that facilitates remote medical
              consultations, while also offering a convenient service for
              patients to order and purchase prescription medications online.
            </p>
          </div>
          <div className="w-full lg:max-w-[500px] flex justify-between gap-4 md:mt-0">
            <div>
              <span className="font-poppins font-semibold sm:text-lg lg:text-xl">
                Medicine Delivery
              </span>
              <ul className="grid grid-cols-1 gap-y-1 mt-2">
                <li className="text-sm sm:text-base md:text-lg">Medicines</li>
                <li className="text-sm sm:text-base md:text-lg">
                  Medicine Category
                </li>
                <li className="text-sm sm:text-base md:text-lg">My Cart</li>
                <li className="text-sm sm:text-base md:text-lg">My Orders</li>
              </ul>
            </div>
            <div>
              <span className="font-poppins font-semibold sm:text-lg lg:text-xl">
                Doctor Consultation
              </span>
              <ul className="grid grid-cols-1 gap-y-1 mt-2">
                <li className="text-sm sm:text-base md:text-lg">Doctors</li>
                <li className="text-sm sm:text-base md:text-lg">
                  Doctor Spesialist
                </li>
                <li className="text-sm sm:text-base md:text-lg">
                  My Consultation History
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-7">
          <span className="font-poppins font-semibold sm:text-lg md:hidden">
            Follow Us
          </span>
          <div className="flex gap-x-6 mt-2">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <TiktokIcon />
          </div>
        </div>
        <hr className="mt-7 hidden md:block" />
        <span className="font-poppins text-base hidden md:block md:mt-7">
          &copy; 2024 Sehatin. All rights reserved
        </span>
      </div>
    </div>
  );
};

export default Footer;
