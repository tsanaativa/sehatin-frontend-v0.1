import NoDataFound from '@/components/common/NoDataFound';
import Skeleton from '@/components/common/Skeleton';
import { getCategories } from '@/services/category';
import { Category } from '@/types/Product';
import Link from 'next/link';

const AllCategories = async () => {
  let categories: Category[] | undefined;
  categories = await getCategories();

  return (
    <div>
      {!!!categories ? (
        <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
          {Array.from({ length: 30 }).map((val, idx) => (
            <div
              key={idx}
              className={`border-gray-light px-3 py-2 ${idx + 1 !== categories?.length && 'border-b md:border-b-0'} md:py-3 md:px-4 ${idx % 3 !== 2 && 'md:border-e'}`}
            >
              <Skeleton>
                <div className="bg-gray-light">
                  <span className="invisible">Category</span>
                </div>
              </Skeleton>
            </div>
          ))}
        </div>
      ) : (
        <>
          {categories.length > 0 ? (
            <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
              {categories.map((category, idx) => (
                <Link key={idx} href={`/meds/search?categoryId=${category.id}`}>
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
      )}
    </div>
  );
};

export default AllCategories;
