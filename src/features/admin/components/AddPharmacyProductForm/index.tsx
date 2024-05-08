'use client';
import { Input, Selector } from '@/components/common';
import { DUMMY_SPECIALISTS } from '@/constants/dummy';
import Image from 'next/image';
import { useState } from 'react';

const AddPharmacyProductForm = () => {
  const [product, setProduct] = useState<string>('');

  const handleSearchProduct = (option: string) => {
    setProduct(option);
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 w-1/2">
        <Selector
          id="district"
          options={DUMMY_SPECIALISTS}
          selected={product}
          onSelect={handleSearchProduct}
          name="district"
          searchable
          required
          placeholder="Search by name, category..."
        />
        <div className="flex justify-between gap-x-6">
          <div>
            <Image
              src={
                'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              }
              className="object-cover"
              width={300}
              height={90}
              alt=""
            />
          </div>
          <div className="w-full flex flex-col gap-y-6">
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Name
              </span>
              <span className="text-base text-dark w-3/5">Panadol</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Selling Unit
              </span>
              <span className="text-base text-dark w-3/5">Box</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Category
              </span>
              <span className="text-base text-dark w-3/5">Obat Batuk</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Description
              </span>
              <span className="text-base text-dark w-3/5">
                OBH COMBI is a cough medicine containing Paracetamol, Ephedrine
                HCl, and Chlorphenamine maleate which is used to relieve coughs
                accompanied by flu symptoms such as fever, headache, and
                sneezing.
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Content
              </span>
              <span className="text-base text-dark w-3/5">
                Vitamin C 400 mg, Natrium askorbat 350 mg, ekstrak citrus,
                Paracetamol 100 mg, Ephedrine HCl 50 mg, and Chlorphenamine
                maleate 10 mg.
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Product Form
              </span>
              <span className="text-base text-dark w-3/5">Syrup</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Weight
              </span>
              <span className="text-base text-dark w-3/5">100 gram</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Dimension (l x w x h)
              </span>
              <span className="text-base text-dark w-3/5">
                5 cm x 5 cm x 10cm
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-base text-dark-gray">
                Manufacture
              </span>
              <span className="text-base text-dark w-3/5">
                PT Harapan Hidup
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <label htmlFor="price">
          <h5 className="text-sm text-dark-gray">Price</h5>
          <Input inputClass="w-full" placeholder="fill the price..." />
        </label>
        <label htmlFor="stock">
          <h5 className="text-sm text-dark-gray">Stock</h5>
          <Input inputClass="w-full" placeholder="fill the stock..." />
        </label>
      </div>
    </>
  );
};

export default AddPharmacyProductForm;
