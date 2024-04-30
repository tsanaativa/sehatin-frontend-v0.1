'use client';

import { Carousel, CategorizeSection, ProductCard } from '@/components/common';
import NoDataFound from '@/components/common/NoDataFound';
import ProductCardSkeleton from '@/components/common/ProductCardSkeleton';
import { Category } from '@/types/Category';
import { Product } from '@/types/Product';
import api from '@/utils/api';
import { getUser } from '@/utils/auth';
import { splitToNArrays } from '@/utils/helper';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type ProductsSectionProps = {
  category: Category;
};

const ProductsSection = ({ category }: ProductsSectionProps) => {
  const [productsSlices, setProductsSlices] = useState<Array<Product[]>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          longitude: -6.226135037364805,
          latitude: 106.80978466685714,
          categoryId: category.id,
          limit: 15,
        };
        const res = await api.get<typeof params, { products: Product[] }>(
          `/products/nearest`,
          params
        );

        const slicedProducts = splitToNArrays<Product>(res.data.products, 5);
        setProductsSlices(slicedProducts);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category.id, user]);

  return (
    <CategorizeSection
      title={category.name}
      seeAllUrl={`/meds/search?categoryId=${category.id}`}
      className="mt-6 md:mt-16"
    >
      {!isLoading ? (
        <>
          <div className="overflow-x-auto xl:hidden">
            {productsSlices.length > 0 ? (
              <div className="grid grid-cols-6 min-w-max gap-3 sm:gap-4 md:gap-6 ">
                {productsSlices.map((products, iter) => (
                  <>
                    {products.map((product, idx) => (
                      <ProductCard
                        key={idx}
                        width="max-w-[197.2px]"
                        product={product}
                      />
                    ))}
                  </>
                ))}
              </div>
            ) : (
              <NoDataFound className="min-h-[272px]" />
            )}
          </div>
          <div className="hidden xl:block">
            {productsSlices.length > 0 ? (
              <Carousel containsCards>
                {productsSlices.map((products, iter) => (
                  <div
                    className="min-w-full relative overflow-x-auto"
                    key={iter}
                  >
                    <div className="grid gap-3 grid-cols-5 sm:gap-4 md:gap-6">
                      {products.map((product, idx) => (
                        <ProductCard
                          key={idx}
                          width="min-w-[197.2px]"
                          product={product}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </Carousel>
            ) : (
              <NoDataFound className="min-h-[272px]" />
            )}
          </div>
        </>
      ) : (
        <div className="grid gap-3 grid-cols-5 overflow-hidden max-h-[272px] sm:gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((val, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )}
    </CategorizeSection>
  );
};

export default ProductsSection;
