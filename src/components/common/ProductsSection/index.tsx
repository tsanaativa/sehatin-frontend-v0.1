import Link from 'next/link';
import React from 'react';
import { ProductCard } from '..';

type ProductsSectionProps = {
  title: string;
  seeAllUrl: string;
};

const ProductsSection = ({ title, seeAllUrl }: ProductsSectionProps) => {
  return (
    <section>
      <div className="flex items-center justify-between items-center">
        <span className="font-poppins font-semibold text-dark">{title}</span>
        <Link className="text-primary-dark text-sm" href={seeAllUrl}>
          See All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 min-w-max gap-4 mt-2">
          {Array.from({ length: 6 }).map((val, idx) => (
            <ProductCard key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
