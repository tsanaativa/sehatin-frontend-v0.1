import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '..';
import { Product } from '@/types/Product';

type ProductCardProps = {
  width?: string;
  product: Product;
};

const ProductCard = ({ width, product }: ProductCardProps) => {
  console.log(product);
  return (
    <div
      className={`border-2 border-primary-border rounded-lg md:w-full ${width}`}
    >
      <Image
        src={product.image}
        className="w-full h-24 object-cover rounded-tl-lg rounded-tr-lg"
        width={600}
        height={300}
        alt=""
      />
      <div className="pt-2 pb-3 px-2 md:px-3">
        <Link href="/meds/panadol-extra-10-kaplet-2-box-bla">
          <div className="min-h-[40px]">
            <span className="font-poppins font-medium text-dark md:text-sm line-clamp-2">
              {product.name}
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="font-medium text-[0.75rem] text-dark-gray md:text-sm">
              Per {product.selling_unit}
            </span>
            <span className="font-bold text-secondary md:text-sm lg:text-base">
              Rp {parseFloat(product.price).toLocaleString('id')}
            </span>
          </div>
        </Link>
        <Button
          className="flex items-center justify-center gap-x-1 w-full text-xs mt-4 md:text-sm"
          variant="primary"
        >
          <Plus size={14} /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
