'use client';

import { Carousel, CategorizeSection, ProductCard } from '@/components/common';
import NoDataFound from '@/components/common/NoDataFound';
import { DEFAULT_ADDRESS } from '@/constants/address';
import { UserContext } from '@/context/UserProvider';
import { Category, Product } from '@/types/Product';
import { get } from '@/utils/api';
import { splitToNArrays } from '@/utils/helper';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductCardSkeleton from '../ProductCardSkeleton';

type ProductsSectionProps = {
  category: Category;
};

const ProductsSection = ({ category }: ProductsSectionProps) => {
  const { user } = useContext(UserContext);
  const [productsSlices, setProductsSlices] = useState<Array<Product[]>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          longitude:
            user && user?.addresses?.length > 0
              ? user.addresses[0]?.longitude
              : DEFAULT_ADDRESS.longitude,
          latitude:
            user && user?.addresses?.length > 0
              ? user.addresses[0]?.latitude
              : DEFAULT_ADDRESS.latitude,
          categoryId: category.id,
          limit: 15,
        };
        const res = await get<typeof params, { products: Product[] }>(
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

    if (!(user && user?.addresses?.length === 0)) fetchProducts();
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
                  <React.Fragment key={iter}>
                    {products.map((product, idx) => (
                      <ProductCard
                        key={idx}
                        width="max-w-[197.2px]"
                        product={product}
                        isAuthenticated={!!user}
                      />
                    ))}
                  </React.Fragment>
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
                          isAuthenticated={!!user}
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
