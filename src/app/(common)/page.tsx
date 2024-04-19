import Image from 'next/image';
import BannerHero1 from '@/assets/images/banner-hero-1.png';
import BannerHero1Desktop from '@/assets/images/banner-hero-1-desktop.svg';
import BannerHero2 from '@/assets/images/banner-hero-2.png';
import BannerHero2Desktop from '@/assets/images/banner-hero-2-desktop.svg';
import { Button, Carousel, ProductCard } from '@/components/common';
import Link from 'next/link';
import { DoctorBadge, MedicineBadge } from '@/assets/icons';
import CategoriesSection from '@/components/common/CategoriesSection';

const Home = () => {
  return (
    <main className="w-full">
      <div className="bg-primary flex justify-center lg:px-24">
        <div className="max-w-[1440px]">
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
                  diagnosis and medical advice. Get your medical certificates
                  and digital prescription.
                </p>
                <div className="mt-6">
                  <Link href="/doctors">
                    <Button className="px-4 min-w-[9rem] text-lg">
                      Consult Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:hidden">
                <Image
                  src={BannerHero1}
                  className="w-full h-full object-cover"
                  priority
                  alt="banner-hero-1"
                />
              </div>
              <div className="hidden md:inline">
                <Image
                  src={BannerHero1Desktop}
                  className="w-full h-full object-cover"
                  priority
                  alt="banner-hero-1"
                />
              </div>
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
                <div className="mt-6">
                  <Link href="/meds">
                    <Button className="px-4 min-w-[9rem] text-lg">
                      Order Now
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:hidden">
                <Image
                  src={BannerHero2}
                  className="w-full h-full object-cover"
                  priority
                  alt="banner-hero-2"
                />
              </div>
              <div className="hidden md:inline">
                <Image
                  src={BannerHero2Desktop}
                  className="w-full h-full object-cover"
                  priority
                  alt="banner-hero-2"
                />
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-light w-full -mt-2 z-20 py-4 md:py-10 px-4 rounded-tl-lg rounded-tr-lg md:top-0 md:rounded-tl-none md:rounded-tr-none sm:px-6 md:mt-0 max-w-[1150px]">
          <section className="flex flex-col items-center">
            <span className="font-poppins font-semibold text-dark md:text-2xl">
              Our Services
            </span>
            <div className="flex justify-between w-full mt-2 md:mt-4 sm:justify-center sm:gap-x-8">
              <div className="bg-primary-light px-8 p-4 flex flex-col items-center">
                <MedicineBadge size={70} />
                <span className="text-[0.625rem] text-secondary md:text-lg mt-2 font-medium">
                  Medicine Delivery
                </span>
              </div>
              <div className="bg-primary-light px-8 p-4 flex flex-col items-center">
                <DoctorBadge size={70} />
                <span className="text-[0.625rem] text-secondary md:text-lg mt-2 font-medium">
                  Doctor Consultation
                </span>
              </div>
            </div>
          </section>
          <div className="mt-6">
            <div className="mt-2 md:mt-16">
              <CategoriesSection />
            </div>
          </div>
          <section className="mt-6 md:mt-16">
            <div className="flex items-center justify-between">
              <span className="font-poppins font-semibold text-dark md:text-2xl">
                Most Bought Products
              </span>
              <Link
                className="text-primary-dark text-sm sm:text-xl"
                href="/meds"
              >
                See All
              </Link>
            </div>
            <div className="grid gap-3 sm:gap-4 mt-2 md:mt-4 mb-4 md:gap-6 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))]">
              {Array.from({ length: 10 }).map((val, idx) => (
                <ProductCard key={idx} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
