'use client';
import { Input, Selector, Skeleton } from '@/components/common';
import { getAllProductsSelect, getProduct } from '@/services/medicine';
import { PharmacyProduct } from '@/types/Pharmacy';
import { Product } from '@/types/Product';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdatePharmacyProductForm = ({
  pharmacyProduct,
}: {
  pharmacyProduct: PharmacyProduct;
}) => {
  const [product, setProduct] = useState<string>('');
  const [productData, setProductData] = useState<Product>(
    pharmacyProduct.product
  );
  const [allProducts, setAllProducts] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState<boolean>(false);

  const { pharmacyId } = useParams();

  useEffect(() => {
    const fetchAllProducts = async () => {
      setIsLoading(true);
      try {
        const res = await getAllProductsSelect();
        setAllProducts(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const res = await getProduct(Number(product));
        setProductData(res);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    if (product) {
      fetchProduct();
    }
  }, [product]);

  const handleSearchProduct = (option: string) => {
    setProduct(option);
  };

  return (
    <>
      <div className="flex flex-col gap-y-6 w-1/2 mt-6">
        <Selector
          id="product"
          name="product"
          options={allProducts}
          selected={product}
          isLoading={isLoading}
          onSelect={handleSearchProduct}
          placeholder="Search by name, category..."
          searchable
        />
        {productData !== undefined ? (
          <>
            {isLoadingProduct ? (
              <Skeleton>
                <div className="flex justify-between gap-x-6">
                  <div>
                    <div className="w-[300px] h-[120px] bg-gray-light"></div>
                  </div>
                  <div className="w-full flex flex-col gap-y-6">
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Name
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        Panadol
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Selling Unit
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        Box
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Category
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        Obat Batuk
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Description
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        OBH COMBI
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Content
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        Vitamin C 400 mg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Product Form
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        Syrup
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Weight
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        100 gram
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Dimension (l x w x h)
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        5 cm x 5 cm x 10cm
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-base text-gray-light bg-gray-light">
                        Manufacture
                      </span>
                      <span className="text-base text-gray-light bg-gray-light w-3/5">
                        PT Harapan Hidup
                      </span>
                    </div>
                  </div>
                </div>
              </Skeleton>
            ) : (
              <div className="flex justify-between gap-x-6">
                <Input name="pharmacyId" value={`${pharmacyId}`} hidden />
                <Input
                  name="productId"
                  value={pharmacyProduct.product.id}
                  hidden
                />
                <div>
                  <Image
                    src={productData.product_picture}
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
                    <span className="text-base text-dark w-3/5">
                      {productData.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Selling Unit
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.selling_unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Category
                    </span>
                    <div className="flex flex-col text-base text-dark w-3/5">
                      {productData.categories?.map((cat, idx) => (
                        <span key={idx}>{cat.name}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Description
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Content
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.content}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Classification
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.classification}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Product Form
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.form}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Weight
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.weight}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Dimension (l x w x h)
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {`${productData.length} cm x ${productData.width} cm x ${productData.height} cm`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-base text-dark-gray">
                      Manufacture
                    </span>
                    <span className="text-base text-dark w-3/5">
                      {productData.manufacture}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
      <div className="flex gap-x-4">
        <label htmlFor="price">
          <h5 className="text-sm text-dark-gray">Price</h5>
          <Input
            name="price"
            inputClass="w-full"
            placeholder="fill the price..."
            defaultValue={pharmacyProduct.price}
          />
        </label>
        <label htmlFor="stock">
          <h5 className="text-sm text-dark-gray">Stock</h5>
          <Input
            name="stock"
            inputClass="w-full"
            placeholder="fill the stock..."
            defaultValue={pharmacyProduct.total_stock}
          />
        </label>
      </div>
    </>
  );
};

export default UpdatePharmacyProductForm;
