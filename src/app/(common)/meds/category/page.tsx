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
  ];

  return (
    <div>
      <span className="font-poppins font-semibold text-dark">
        Choose Category
      </span>
      <div className="bg-light rounded-lg border border-gray-light mt-3">
        {dummyCategories.map((category, idx) => {
          return (
            <Link key={idx} href={`/meds/search?categoryId=${category.id}`}>
              <div
                key={idx}
                className={`${idx + 1 !== dummyCategories.length && 'border-b'} border-gray-light px-3 py-2`}
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
