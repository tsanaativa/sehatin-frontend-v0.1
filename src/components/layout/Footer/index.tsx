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
      <div className="max-w-[1440px] w-full m-auto px-4 pt-5 pb-24 sm:px-6 md:px-20 md:pt-16">
        <div className="w-full flex flex-wrap md:flex-nowrap md:gap-x-72">
          <div>
            <SehatinWhite />
            <p className="text-xs mt-3 sm:text-base md:text-lg">
              Layanan kesehatan digital yang memfasilitasi konsultasi dan
              pengobatan medis jarak jauh sekaligus memfasilitasi pasien untuk
              memesan dan membeli obat secara online dengan mudah dan cepat.
            </p>
          </div>
          <div className="w-full flex justify-between mt-10 md:mt-0">
            <div>
              <span className="font-poppins font-semibold sm:text-lg md:text-xl">
                Pesan Antar Obat
              </span>
              <ul className="grid grid-cols-1 gap-y-1 mt-2">
                <li className="text-xs sm:text-base md:text-lg">
                  Kategori Obat
                </li>
                <li className="text-xs sm:text-base md:text-lg">Cari Obat</li>
                <li className="text-xs sm:text-base md:text-lg">
                  Keranjang Saya
                </li>
                <li className="text-xs sm:text-base md:text-lg">
                  Pesanan Saya
                </li>
              </ul>
            </div>
            <div>
              <span className="font-poppins font-semibold sm:text-lg md:text-xl">
                Konsultasi Doktor
              </span>
              <ul className="grid grid-cols-1 gap-y-1 mt-2">
                <li className="text-xs sm:text-base md:text-lg">
                  Spesialis Doktor
                </li>
                <li className="text-xs sm:text-base md:text-lg">Cari Doktor</li>
                <li className="text-xs sm:text-base md:text-lg">
                  Riwayat Konsultasi Saya
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-7">
          <span className="font-poppins font-semibold sm:text-lg md:hidden">
            Media Sosial
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
