'use client';
import { Input, Selector, TextArea } from '@/components/common';
import { DUMMY_CATEGORY_FORM } from '@/constants/dummy';
import { getCategories } from '@/services/category';
import { getAllClassifications } from '@/services/medicine';
import { Category } from '@/types/Product';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const CreateMedicineForm = () => {
  const [category, setCategory] = useState<string>('');
  const [classification, setClassification] = useState<string>('');
  const [allCategories, setAllCategories] = useState<Record<string, string>>(
    {}
  );
  const [allClassifications, setAllClassifications] = useState<
    Record<string, string>
  >({});
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
  const [isLoadingClassifications, setIsLoadingClassifications] =
    useState<boolean>(false);

  const name = useRef<HTMLInputElement>(null);
  const genericName = useRef<HTMLInputElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const unitInPack = useRef<HTMLInputElement>(null);
  const sellingUnit = useRef<HTMLInputElement>(null);
  const weight = useRef<HTMLInputElement>(null);
  const dimensionLength = useRef<HTMLInputElement>(null);
  const dimensionWidth = useRef<HTMLInputElement>(null);
  const dimensionHeight = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const res = await getCategories();
        setAllCategories(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchAllClassifications = async () => {
      setIsLoadingClassifications(true);
      try {
        const res = await getAllClassifications();
        setAllClassifications(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingClassifications(false);
      }
    };

    fetchAllCategories();
    fetchAllClassifications();
  }, []);

  useEffect(() => {
    console.log(allClassifications);
  });

  const handleCategory = (option: string) => {
    setCategory(option);
  };

  const handleClassification = (option: string) => {
    setClassification(option);
  };

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <label htmlFor="name">
          <h5 className="text-sm text-dark-gray">Name</h5>
          <Input
            ref={name}
            id="name"
            placeholder="Type your fullname..."
            inputClass="w-full"
          />
        </label>
        <label htmlFor="genericName">
          <h5 className="text-sm text-dark-gray">Generic Name</h5>
          <Input
            ref={genericName}
            id="genericName"
            placeholder="Type a generic name..."
            inputClass="w-full"
          />
        </label>
        <div className="flex gap-x-4">
          <label htmlFor="category">
            <h5 className="text-sm text-dark-gray">Category</h5>
            <Selector
              id="category"
              name="category"
              options={allCategories}
              isLoading={isLoadingCategories}
              selected={category}
              onSelect={handleCategory}
              placeholder="Choose category"
              searchable
            />
          </label>
          <label htmlFor="classification">
            <h5 className="text-sm text-dark-gray">Classification</h5>
            <Selector
              id="classification"
              name="classification"
              options={allClassifications}
              isLoading={isLoadingClassifications}
              selected={classification}
              onSelect={handleClassification}
              placeholder="Choose classification"
              searchable
            />
          </label>
        </div>
        <label htmlFor="content">
          <h5 className="text-sm text-dark-gray">Content</h5>
          <TextArea ref={content} placeholder="fill the content..." />
        </label>
        <label htmlFor="description">
          <h5 className="text-sm text-dark-gray">Description</h5>
          <TextArea ref={description} placeholder="fill the description..." />
        </label>
      </div>
      <div className="flex flex-col gap-y-6 w-2/5">
        <label htmlFor="unitInPack">
          <h5 className="text-sm text-dark-gray">Unit In Pack</h5>
          <Input
            ref={unitInPack}
            id="unitInPack"
            placeholder="fill the unit in pack..."
            inputClass="w-full"
          />
        </label>
        <div className="flex gap-x-4">
          <label htmlFor="sellingUnit">
            <h5 className="text-sm text-dark-gray">Selling Unit</h5>
            <Input
              ref={sellingUnit}
              id="sellingUnit"
              prepend="Per"
              placeholder="fill the selling unit..."
              inputClass="w-full"
            />
          </label>
          <label htmlFor="weight">
            <h5 className="text-sm text-dark-gray">Weight</h5>
            <Input
              ref={weight}
              id="weight"
              type="number"
              append="gr"
              placeholder="fill the weight..."
              inputClass="w-full"
            />
          </label>
        </div>
        <label htmlFor="dimensionLength">
          <h5 className="text-sm text-dark-gray">
            Dimension (length x width x height)
          </h5>
          <div className="flex gap-x-2">
            <Input
              ref={dimensionLength}
              id="dimensionLength"
              type="number"
              append="cm"
              placeholder="fill the length..."
              inputClass="w-full"
            />
            <Input
              ref={dimensionWidth}
              id="dimensionWidth"
              type="number"
              append="cm"
              placeholder="fill the width..."
              inputClass="w-full"
            />
            <Input
              ref={dimensionHeight}
              id="dimensionHeight"
              type="number"
              append="cm"
              placeholder="fill the height..."
              inputClass="w-full"
            />
          </div>
        </label>
      </div>
    </>
  );
};

export default CreateMedicineForm;
