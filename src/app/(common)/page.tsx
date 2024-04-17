import Image from 'next/image';
import BannerHero1 from '@/assets/images/banner-hero-1.png';
import BannerHero2 from '@/assets/images/banner-hero-2.png';
import { Carousel, ProductCard } from '@/components/common';
import Link from 'next/link';
import {
  CoughBadge,
  DoctorBadge,
  FeverBadge,
  HeadacheBadge,
  MedicineBadge,
  SoreThroatBadge,
  SupplementBadge,
  VitaminBadge,
} from '@/assets/icons';

const Home = () => {
  return (
    <main>
      <Carousel autoSlide autoSlideInterval={5000}>
        <div className="min-w-full relative">
          <div className="absolute top-4 left-4 w-56 sm:top-6 sm:left-6">
            <span className="font-poppins text-secondary text-xs">
              No More Hassle! Take Online
            </span>
            <h1 className="font-poppins font-bold text-xl text-secondary mt-1">
              Doctor <span className="text-primary-dark">Consultation</span>
            </h1>
            <p className="text-[0.625rem] mt-1">
              Connect instantly with a specialist who provides accurate
              diagnosis and medical advice. Get your medical certificates and
              digital prescription.
            </p>
          </div>
          <Image
            src={BannerHero1}
            className="w-full h-full object-cover"
            priority
            alt="banner-hero-1"
          />
        </div>
        <div className="min-w-full relative">
          <div className="absolute top-4 left-4 w-48 sm:top-6 sm:left-6">
            <span className="font-poppins text-secondary text-xs">
              Right at Your Door! Get Fast
            </span>
            <h1 className="font-poppins font-bold text-xl text-secondary mt-1">
              Medicine <span className="text-primary-dark">Delivery</span>
            </h1>
            <p className="text-[0.625rem] mt-1">
              Add medicines of your choice to cart or click on your digital
              prescription and place order. Get your medicines delivered.
            </p>
          </div>
          <Image
            src={BannerHero2}
            className="w-full h-full object-cover"
            priority
            alt="banner-hero-1"
          />
        </div>
      </Carousel>
      <section className="bg-light w-full -mt-2 z-20 py-4 px-4 rounded-tl-lg rounded-tr-lg md:top-0 md:rounded-tl-none md:rounded-tr-none sm:px-6 md:mt-0">
        <div className="flex flex-col items-center">
          <span className="font-poppins font-semibold text-dark">
            Our Services
          </span>
          <div className="flex justify-between w-full mt-6">
            <div className="bg-primary-light px-8 pt-2 pb-4 flex flex-col items-center">
              <MedicineBadge />
              <span className="text-[0.625rem] text-secondary">
                Medicine Delivery
              </span>
            </div>
            <div className="bg-primary-light px-8 pt-2 pb-4 flex flex-col items-center">
              <DoctorBadge />
              <span className="text-[0.625rem] text-secondary">
                Doctor Consultation
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="font-poppins font-semibold text-dark">
              Product Categories
            </span>
            <Link className="text-primary-dark text-xs" href="/categories">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-x-52 gap-y-4 overflow-x-auto mt-4">
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <VitaminBadge />
              </div>
              <span>Vitamin C</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <HeadacheBadge />
              </div>
              <span>Obat Sakit Kepala</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <SupplementBadge />
              </div>
              <span>Suplemen Daya Tahan</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <FeverBadge />
              </div>
              <span>Obat Demam</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <CoughBadge />
              </div>
              <span>Obat Batuk</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
              <div className="min-w-fit">
                <SoreThroatBadge />
              </div>
              <span>Obat Sakit Tenggorokan</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <span className="font-poppins font-semibold text-dark">
              Most Bought Products
            </span>
            <Link className="text-primary-dark text-xs" href="/meds">
              See all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 my-4">
            {Array.from({ length: 6 }).map((val, idx) => (
              <ProductCard key={idx} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
