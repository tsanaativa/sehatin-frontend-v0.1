import Link from 'next/link';
import React from 'react';

type CategorizeSectionProps = {
  title: string;
  seeAllUrl: string;
  children: React.ReactNode;
  className?: string;
};

const CategorizeSection = ({
  title,
  seeAllUrl,
  children,
  className,
}: CategorizeSectionProps) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <span className="font-poppins font-semibold text-dark md:text-2xl">
          {title}
        </span>
        <Link className="text-primary-dark text-sm md:text-xl" href={seeAllUrl}>
          See All
        </Link>
      </div>
      {children}
    </section>
  );
};

export default CategorizeSection;
