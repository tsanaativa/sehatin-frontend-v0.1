import {
  FacebookIcon,
  InstagramIcon,
  SehatinWhite,
  TiktokIcon,
  TwitterIcon,
} from '@/assets/icons';

const Footer = () => {
  return (
    <div className="bg-primary-darker text-light px-4 pt-5 pb-24 sm:px-6">
      <div>
        <SehatinWhite />
        <p className="text-xs mt-3">
          Layanan kesehatan digital yang memfasilitasi konsultasi dan pengobatan
          medis jarak jauh sekaligus memfasilitasi pasien untuk memesan dan
          membeli obat secara online dengan mudah dan cepat.
        </p>
      </div>
      <div className="flex justify-between mt-10">
        <div>
          <span className="font-poppins font-semibold">Pesan Antar Obat</span>
          <ul className="grid grid-cols-1 gap-y-1 mt-2">
            <li className="text-xs">Kategori Obat</li>
            <li className="text-xs">Cari Obat</li>
            <li className="text-xs">Keranjang Saya</li>
            <li className="text-xs">Pesanan Saya</li>
          </ul>
        </div>
        <div>
          <span className="font-poppins font-semibold">Konsultasi Doktor</span>
          <ul className="grid grid-cols-1 gap-y-1 mt-2">
            <li className="text-xs">Spesialis Doktor</li>
            <li className="text-xs">Cari Doktor</li>
            <li className="text-xs">Riwayat Konsultasi Saya</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <span className="font-poppins font-semibold">Media Sosial</span>
        <div className="flex gap-x-6 mt-2">
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <TiktokIcon />
        </div>
      </div>
    </div>
  );
};

export default Footer;
