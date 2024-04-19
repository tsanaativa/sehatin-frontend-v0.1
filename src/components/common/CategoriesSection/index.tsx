import {
  CoughBadge,
  FeverBadge,
  HeadacheBadge,
  SoreThroatBadge,
  SupplementBadge,
  VitaminBadge,
} from '@/assets/icons';
import ChildBadge from '@/assets/icons/ChildBadge';
import PregnantBadge from '@/assets/icons/PregnantBadge';
import Link from 'next/link';
import React from 'react';

const CategoriesSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <span className="font-poppins font-semibold text-dark sm:text-2xl">
          Categories
        </span>
        <Link
          className="text-primary-dark text-sm sm:text-xl"
          href="/meds/category"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto mt-2 md:mt-4 md:gap-x-8">
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <VitaminBadge />
          </div>
          <span>Vitamin C</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <HeadacheBadge />
          </div>
          <span>Obat Sakit Kepala</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <SupplementBadge />
          </div>
          <span>Suplemen Daya Tahan</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <FeverBadge />
          </div>
          <span>Obat Demam</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <CoughBadge />
          </div>
          <span>Obat Batuk</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <SoreThroatBadge />
          </div>
          <span>Obat Sakit Tenggorokan</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <ChildBadge />
          </div>
          <span>Vitamin Anak</span>
        </div>
        <div className="bg-primary-light flex items-center gap-x-4 w-48 rounded-lg px-4 py-4 md:w-full">
          <div className="min-w-fit">
            <PregnantBadge />
          </div>
          <span>Vitamin Ibu Hamil</span>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
