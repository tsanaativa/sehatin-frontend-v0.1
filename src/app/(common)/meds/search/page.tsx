import { ProductCard } from '@/components/common';
import FilterDropdown from '@/components/common/FilterDropdown';
import Pagination from '@/components/common/Pagination';
import { DUMMY_PRODUCT } from '@/constants/dummy';
import MedsSortDropdown from '@/features/meds/components/MedsSortDropdown';

const SearchProducts = () => {
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex justify-between items-center">
          <span className="text-dark-gray text-sm">
            10 to 20 of 100 results
          </span>
          <div className="grid grid-cols-2 gap-2">
            <MedsSortDropdown />
            <FilterDropdown options={{}} selected="" onFilter={() => {}} />
          </div>
        </div>
        <div className="grid gap-3 mt-4 mb-4 grid-cols-[repeat(auto-fit,_minmax(156px,_1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(193px,_1fr))] sm:gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((product, idx) => {
            return <ProductCard product={DUMMY_PRODUCT} key={idx} />;
          })}
        </div>
        <div className="flex w-full py-4">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;
