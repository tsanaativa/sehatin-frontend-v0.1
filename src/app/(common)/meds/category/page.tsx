import NoDataFound from '@/components/common/NoDataFound';
import { getCategories } from '@/services/category';
import { Category } from '@/types/Product';
import Link from 'next/link';

const Categories = async () => {
  let categories: Category[] | undefined;
  categories = await getCategories();

  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="pb-4">
          <span className="font-poppins font-semibold text-dark md:text-2xl">
            Choose Category
          </span>
          <div>
            <>
              {categories.length > 0 ? (
                <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
                  {categories.map((category, idx) => (
                    <Link
                      key={idx}
                      href={`/meds/search?categoryId=${category.id}`}
                    >
                      <div
                        key={idx}
                        className={`border-gray-light px-3 py-2 h-full ${idx + 1 !== categories?.length && 'border-b md:border-b-0'} md:py-3 md:px-4 ${idx % 3 !== 2 && 'md:border-e'}`}
                      >
                        {category.name}
                      </div>
                    </Link>
                  ))}
                  {Array.from({ length: 3 - (categories.length % 3) }).map(
                    (val, idx) => (
                      <div
                        key={idx}
                        className={`hidden border-gray-light py-3 px-4 h-full ${idx !== 2 - ((categories?.length || 0) % 3) && 'border-e'} md:block`}
                      ></div>
                    )
                  )}
                </div>
              ) : (
                <NoDataFound className="py-16" />
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
