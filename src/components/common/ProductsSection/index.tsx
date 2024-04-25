import Link from 'next/link';
import { ProductCard } from '..';

type ProductsSectionProps = {
  title: string;
  seeAllUrl: string;
};

const ProductsSection = ({ title, seeAllUrl }: ProductsSectionProps) => {
  return (
    <section className="mt-6 md:mt-16">
      <div className="flex items-center justify-between">
        <span className="font-poppins font-semibold text-dark md:text-2xl">
          {title}
        </span>
        <Link className="text-primary-dark text-sm sm:text-xl" href={seeAllUrl}>
          See All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-6 min-w-max gap-3 sm:gap-4 md:gap-6 mt-2 md:mt-4">
          {Array.from({ length: 6 }).map((val, idx) => (
            <ProductCard key={idx} width="max-w-[197.2px]" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
