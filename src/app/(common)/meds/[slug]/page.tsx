import { Button, Counter } from '@/components/common';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { PharmacyModal } from '@/features/meds/components';

const MedsDetail = () => {
  return (
    <div className="bg-light w-full flex justify-center">
      <div className="flex flex-wrap h-fit md:px-4 md:flex-nowrap md:gap-x-4 md:pt-10 md:pb-20 md:max-w-[1150px]">
        <Image
          src="https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-1/2 object-cover md:w-1/2"
          width={600}
          height={300}
          alt=""
        />
        <div className="px-4 py-6 sm:px-6 md:pe-0 w-full md:pt-0">
          <h1 className="font-poppins font-semibold text-dark text-xl md:text-2xl">
            Panadol Obat Pusing
          </h1>
          <div className="flex justify-between mt-2">
            <div>
              <span className="font-bold text-xl text-secondary mr-2 md:text-2xl">
                Rp 15.990
              </span>
              <span className="text-[0.625rem] font-medium text-gray md:text-sm">
                Per Box
              </span>
            </div>
            <Counter className="md:hidden" />
          </div>
          <span className="text-xs text-dark">Stock: 8</span>
          <PharmacyModal />
          <div className="hidden items-center gap-x-10 mt-6 md:flex">
            <Counter />
            <Button className="w-40 flex items-center justify-center gap-x-1 font-poppins font-semibold text-sm">
              <Plus size={14} /> Add to Cart
            </Button>
          </div>
          <div className="flex flex-col gap-y-4 mt-6">
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Generic Name
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                Paracetamol
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Description
              </span>
              <p className="text-xs text-dark-gray md:text-base">
                OBH COMBI is a cough medicine containing Paracetamol, Ephedrine
                HCl, and Chlorphenamine maleate which is used to relieve coughs
                accompanied by flu symptoms such as fever, headache, and
                sneezing.
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Category
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                Obat Batuk
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Content
              </span>
              <p className="text-xs text-dark-gray md:text-base">
                Vitamin C 400 mg, Natrium askorbat 350 mg, ekstrak citrus,
                Paracetamol 100 mg, Ephedrine HCl 50 mg, and Chlorphenamine
                maleate 10 mg.
              </p>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Classification
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                Obat Keras
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Medicine Form
              </span>
              <span className="text-xs text-dark-gray md:text-base">Syrup</span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Unit in Pack
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                5 ml per spoon of syrup
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Weight
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                100 gram
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Dimension (lxwxh)
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                5 cm x 5 cm x 10cm
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="font-poppins font-semibold text-sm text-dark md:text-base">
                Manufacture
              </span>
              <span className="text-xs text-dark-gray md:text-base">
                PT Kalbe Blabla
              </span>
            </div>
          </div>
        </div>
        <div className="hidden items-center gap-x-10 mt-6 md:flex">
          <Counter />
          <Button className="w-40 flex items-center justify-center gap-x-1 font-poppins font-semibold text-sm">
            <Plus size={14} /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedsDetail;
