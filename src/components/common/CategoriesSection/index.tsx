import {
  CoughBadge,
  FeverBadge,
  HeadacheBadge,
  SoreThroatBadge,
  SupplementBadge,
  VitaminBadge,
} from '@/assets/icons';
import Link from 'next/link';
import React from 'react';

const CategoriesSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <span className="font-poppins font-semibold text-dark">
          Product Categories
        </span>
        <Link className="text-primary-dark text-sm" href="/categories">
          See all
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-x-52 gap-y-4 overflow-x-auto mt-2">
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <VitaminBadge />
          </div>
          <span>Vitamin C</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <HeadacheBadge />
          </div>
          <span>Obat Sakit Kepala</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <SupplementBadge />
          </div>
          <span>Suplemen Daya Tahan</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <FeverBadge />
          </div>
          <span>Obat Demam</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <CoughBadge />
          </div>
          <span>Obat Batuk</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4">
          <div className="min-w-fit">
            <SoreThroatBadge />
          </div>
          <span>Obat Sakit Tenggorokan</span>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
