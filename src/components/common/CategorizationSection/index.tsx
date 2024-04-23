import Link from 'next/link';
import React from 'react';

type CategorizationSectionProps = {
  title: string;
  seeAllUrl: string;
  children: React.ReactNode;
  className?: string;
};

const CategorizationSection = ({
  title,
  seeAllUrl,
  children,
  className,
}: CategorizationSectionProps) => {
  return (
    <section className={className}>
      <div className="flex items-center justify-between items-center">
        <span className="font-poppins font-semibold text-dark md:text-2xl">
          {title}
        </span>
        <Link className="text-primary-dark text-sm sm:text-xl" href={seeAllUrl}>
          See All
        </Link>
      </div>
      {children}
    </section>
  );
};

export default CategorizationSection;
