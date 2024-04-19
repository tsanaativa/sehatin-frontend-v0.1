import Link from 'next/link';
import React from 'react';

const Category = () => {
  const dummyCategories = [
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
    {
      id: 1,
      name: 'Vitamin C',
    },
  ];

  return (
    <div className="pb-4">
      <span className="font-poppins font-semibold text-dark md:text-2xl">
        Choose Category
      </span>
      <div className="bg-light rounded-lg border border-gray-light mt-3 md:mt-5 md:text-lg flex flex-col md:grid md:grid-cols-3 md:grid-flow-row">
        {dummyCategories.map((category, idx) => {
          return (
            <Link key={idx} href={`/meds/search?categoryId=${category.id}`}>
              <div
                key={idx}
                className={`${idx + 1 !== dummyCategories.length && 'border-b md:border-b-0'} ${idx % 3 !== 2 && 'md:border-e'} border-gray-light px-3 py-2 md:py-3 md:px-4`}
              >
                {category.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
