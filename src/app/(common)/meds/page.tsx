import { Button, Carousel, ProductCard } from '@/components/common';
import CategorizeSection from '@/components/common/CategorizeSection';
import { DISPLAYED_CATEGORIES } from '@/constants/categories';
import CategoriesSection from '@/features/meds/components/CategoriesSection';
import ProductsSection from '@/features/meds/components/ProductsSection';

const Meds = () => {
  const shownCategories = DISPLAYED_CATEGORIES.slice(0, 2);
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex flex-col">
          <CategoriesSection />
          {shownCategories.map((category, idx) => (
            <ProductsSection category={category} key={idx} />
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
