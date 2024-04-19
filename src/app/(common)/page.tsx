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
          <div className="absolute top-4 left-4 w-56 sm:top-6 sm:left-6 md:w-[663px] md:top-28 md:left-20">
            <span className="font-poppins font-medium text-secondary text-xs md:text-3xl">
              No More Hassle! Take Online
            </span>
            <h1 className="font-poppins font-bold text-xl text-secondary mt-1 md:text-6xl md:mt-4">
              Doctor <span className="text-primary-dark">Consultation</span>
            </h1>
            <p className="text-[0.625rem] mt-1 md:text-xl md:mt-4">
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
          <div className="absolute top-4 left-4 w-56 sm:top-6 sm:left-6 md:w-[663px] md:top-28 md:left-20">
            <span className="font-poppins font-medium text-secondary text-xs md:text-3xl">
              Right at Your Door! Get Fast
            </span>
            <h1 className="font-poppins font-bold text-xl text-secondary mt-1 md:text-6xl md:mt-4">
              Medicine <span className="text-primary-dark">Delivery</span>
            </h1>
            <p className="text-[0.625rem] mt-1 md:text-xl md:mt-4">
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
      <section className="bg-light w-full -mt-2 z-20 py-4 px-4 rounded-tl-lg rounded-tr-lg md:top-0 md:rounded-tl-none md:rounded-tr-none sm:px-6 md:mt-0 md:px-44">
        <div className="flex flex-col items-center">
          <span className="font-poppins font-semibold text-dark sm:text-2xl">
            Our Services
          </span>
          <div className="flex justify-between w-full mt-6 sm:justify-center sm:gap-x-12">
            <div className="bg-primary-light px-8 pt-2 pb-4 flex flex-col items-center">
              <MedicineBadge size={84} />
              <span className="text-[0.625rem] text-secondary md:text-xl">
                Medicine Delivery
              </span>
            </div>
            <div className="bg-primary-light px-8 pt-2 pb-4 flex flex-col items-center">
              <DoctorBadge size={84} />
              <span className="text-[0.625rem] text-secondary md:text-xl">
                Doctor Consultation
              </span>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-16">
          <div className="flex items-center justify-between">
            <span className="font-poppins font-semibold text-dark sm:text-2xl">
              Product Categories
            </span>
            <Link
              className="text-primary-dark text-xs sm:text-xl"
              href="/categories"
            >
              See all
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto mt-4 md:gap-x-8">
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <VitaminBadge />
              </div>
              <span>Vitamin C</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <HeadacheBadge />
              </div>
              <span>Obat Sakit Kepala</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <SupplementBadge />
              </div>
              <span>Suplemen Daya Tahan</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <FeverBadge />
              </div>
              <span>Obat Demam</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <CoughBadge />
              </div>
              <span>Obat Batuk</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <SoreThroatBadge />
              </div>
              <span>Obat Sakit Tenggorokan</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <SoreThroatBadge />
              </div>
              <span>Obat Sakit Tenggorokan</span>
            </div>
            <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
              <div className="min-w-fit">
                <SoreThroatBadge />
              </div>
              <span>Obat Sakit Tenggorokan</span>
            </div>
          </div>
        </div>
        <div className="mt-6 md:mt-16">
          <div className="flex items-center justify-between">
            <span className="font-poppins font-semibold text-dark sm:text-2xl">
              Most Bought Products
            </span>
            <Link className="text-primary-dark text-xs sm:text-xl" href="/meds">
              See all
            </Link>
          </div>
          <div className="grid gap-3 sm:gap-4 my-4 md:gap-6 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))]">
            {Array.from({ length: 10 }).map((val, idx) => (
              <Link key={idx} href="/meds/panadol-obat-pusing-1">
                <ProductCard />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
