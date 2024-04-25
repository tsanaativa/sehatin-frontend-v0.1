import Link from 'next/link';
import React from 'react';

type CategorizeCardProps = {
  link: string;
  icon: React.ReactNode;
  name: string;
};

const CategorizeCard = ({ link, icon, name }: CategorizeCardProps) => {
  return (
    <Link href={link}>
      <div className="h-full bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
        <div className="min-w-fit">{icon}</div>
        <span className="line-clamp-2">{name}</span>
      </div>
    </Link>
  );
};

export default CategorizeCard;
