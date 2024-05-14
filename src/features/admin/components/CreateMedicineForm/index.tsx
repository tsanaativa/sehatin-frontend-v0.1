'use client';
import {
  AvatarUploader,
  Button,
  Input,
  Selector,
  TextArea,
} from '@/components/common';
import { getCategories } from '@/services/category';
import {
  getAllClassifications,
  getAllForms,
  getAllManufactures,
} from '@/services/medicine';
import { Save } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { createProductAction } from '../../action/product';
import { slugify } from '@/utils/slugify';

const CreateMedicineForm = () => {
  const [category, setCategory] = useState<string>('');
  const [classification, setClassification] = useState<string>('');
  const [productForm, setProductForm] = useState<string>('');
  const [manufacture, setManufacture] = useState<string>('');
  const [allCategories, setAllCategories] = useState<Record<string, string>>(
    {}
  );
  const [allClassifications, setAllClassifications] = useState<
    Record<string, string>
  >({});
  const [allForms, setAllForms] = useState<Record<string, string>>({});
  const [allManufacures, setAllManufactures] = useState<Record<string, string>>(
    {}
  );
  const [isLoadingCategories, setIsLoadingCategories] =
    useState<boolean>(false);
  const [isLoadingClassifications, setIsLoadingClassifications] =
    useState<boolean>(false);
  const [isLoadingForms, setIsLoadingForms] = useState<boolean>(false);
  const [isLoadingManufactures, setIsLoadingManufactures] =
    useState<boolean>(false);
  const [picture, setPicture] = useState<File | undefined>();

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

    const fetchAllForms = async () => {
      setIsLoadingForms(true);
      try {
        const res = await getAllForms();
        setAllForms(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingForms(false);
      }
    };

    const fetchAllManufactures = async () => {
      setIsLoadingManufactures(true);
      try {
        const res = await getAllManufactures();
        setAllManufactures(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingManufactures(false);
      }
    };

    fetchAllCategories();
    fetchAllClassifications();
    fetchAllForms();
    fetchAllManufactures();
  }, []);

  const handleChangePicture = (file: File) => {
    setPicture(file);
  };

  const handleCategory = (option: string) => {
    setCategory(option);
    console.log('category', option);
  };

  const handleClassification = (option: string) => {
    setClassification(option);
    console.log('classification', option);
  };

  const handleProductForm = (option: string) => {
    setProductForm(option);
    console.log('form', option);
  };

  const handleManufacture = (option: string) => {
    setManufacture(option);
    console.log('manufacture', option);
  };

  const handleSubmit = () => {
    let formData = new FormData();
    if (picture) {
      formData.append('product_picture', picture, picture.name);
    }
    formData.append('name', name.current?.value || '');
    formData.append('generic_name', genericName.current?.value || '');
    // formData.append('categories_id', category || [])
    formData.append('product_classification_id', classification);
    formData.append('content', content.current?.value || '');
    formData.append('description', description.current?.value || '');
    formData.append('unit_in_pack', unitInPack.current?.value || '');
    formData.append('product_form_id', productForm);
    formData.append('manufacture_id', manufacture);
    formData.append('selling_unit', sellingUnit.current?.value || '');
    formData.append('weight', weight.current?.value || '');
    formData.append('length', dimensionLength.current?.value || '');
    formData.append('width', dimensionWidth.current?.value || '');
    formData.append('height', dimensionHeight.current?.value || '');
    formData.append('slug_id', slugify(name.current?.value || ''));

    handleCreate(formData);
  };

  const handleCreate = async (formData: FormData) => {
    try {
      await createProductAction(formData);
      toast.success('successfuly created');
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <form action={handleSubmit} className="mt-2">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins font-semibold text-3xl text-dark">
          Create Medicine
        </h1>
        <Button type="submit" className="flex items-center gap-x-1 px-6 py-3">
          <Save /> Save
        </Button>
      </div>
      <div className="flex justify-between mt-6">
        <AvatarUploader onChange={handleChangePicture} />
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
            <label htmlFor="productForm">
              <h5 className="text-sm text-dark-gray">Product Form</h5>
              <Selector
                id="productForm"
                name="productForm"
                options={allForms}
                isLoading={isLoadingForms}
                selected={productForm}
                onSelect={handleProductForm}
                placeholder="Choose product form"
                searchable
              />
            </label>
            <label htmlFor="manufacture">
              <h5 className="text-sm text-dark-gray">Manufacture</h5>
              <Selector
                id="manufacture"
                name="manufacure"
                options={allManufacures}
                isLoading={isLoadingManufactures}
                selected={manufacture}
                onSelect={handleManufacture}
                placeholder="Choose manufacture"
                searchable
              />
            </label>
          </div>
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
            <div className="flex items-center gap-x-2">
              <Input
                ref={dimensionLength}
                id="dimensionLength"
                type="number"
                append="cm"
                placeholder="fill the length..."
                inputClass="w-full"
              />
              <span className="text-dark-gray">x</span>
              <Input
                ref={dimensionWidth}
                id="dimensionWidth"
                type="number"
                append="cm"
                placeholder="fill the width..."
                inputClass="w-full"
              />
              <span className="text-dark-gray">x</span>
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
      </div>
    </form>
  );
};

export default CreateMedicineForm;
