import { Button, Carousel, ProductCard } from '@/components/common';
import CategorizeSection from '@/components/common/CategorizeSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import CategoriesSection from '@/features/meds/components/CategoriesSection';

const Meds = () => {
  const shownCategories = DISPLAYED_CATEGORIES.slice(0, 2);
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex flex-col">
          <CategoriesSection />
          {shownCategories.map((category, idx) => (
            <CategorizeSection
              title={category.name}
              seeAllUrl={`/meds/search?categoryId=${category.id}`}
              className="mt-6 md:mt-16"
              key={idx}
            >
              <div className="overflow-x-auto xl:hidden">
                <div className="grid grid-cols-6 min-w-max gap-3 sm:gap-4 md:gap-6 ">
                  {Array.from({ length: 6 }).map((val, idx) => (
                    <ProductCard key={idx} width="max-w-[197.2px]" />
                  ))}
                </div>
              </div>
              <div className="hidden xl:block">
                <Carousel containsCards>
                  <div className="min-w-full relative overflow-x-auto">
                    <div className="grid gap-3 grid-cols-5 sm:gap-4 md:gap-6 ">
                      {Array.from({ length: 5 }).map((val, idx) => (
                        <ProductCard key={idx} width="min-w-[197.2px]" />
                      ))}
                    </div>
                  </div>
                  <div className="min-w-full relative overflow-x-auto">
                    <div className="grid gap-3 grid-cols-5 sm:gap-4 md:gap-6 ">
                      {Array.from({ length: 5 }).map((val, idx) => (
                        <ProductCard key={idx} width="min-w-[197.2px]" />
                      ))}
                    </div>
                  </div>
                  <div className="min-w-full relative overflow-x-auto">
                    <div className="grid gap-3 grid-cols-5 md:grid-cols-5 sm:gap-4 md:gap-6 ">
                      {Array.from({ length: 5 }).map((val, idx) => (
                        <ProductCard key={idx} width="min-w-[197.2px]" />
                      ))}
                    </div>
                  </div>
                </Carousel>
              </div>
            </CategorizeSection>
          ))}
          <div className="w-full flex justify-center mt-2 md:mt-10">
            <Button
              className="w-full my-6 md:text-lg md:max-w-[300px]"
              variant="outlined-primary"
            >
              Load More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meds;
