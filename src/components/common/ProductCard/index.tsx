import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '..';
import { DUMMY_PRODUCT } from '@/constants/dummy';
import Link from 'next/link';

type ProductCardProps = {
  width?: string;
};

const ProductCard = ({ width }: ProductCardProps) => {
  return (
    <div
      className={`border-2 border-primary-border rounded-lg md:w-full ${width}`}
    >
      <Link href="/meds/panadol-extra-10-kaplet-2-box-bla">
        <Image
          src={DUMMY_PRODUCT.image}
          className="w-full h-24 object-cover rounded-tl-lg rounded-tr-lg"
          width={600}
          height={300}
          alt=""
        />
        <div className="pt-2 pb-3 px-2 md:px-3">
          <div className="min-h-[40px]">
            <span className="font-poppins font-medium text-dark md:text-sm line-clamp-2">
              {DUMMY_PRODUCT.name}
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <span className="font-medium text-[0.75rem] text-dark-gray md:text-sm">
              Per {DUMMY_PRODUCT.selling_unit}
            </span>
            <span className="font-bold text-secondary md:text-sm lg:text-base">
              Rp {DUMMY_PRODUCT.price.toLocaleString('id')}
            </span>
          </div>
          <Button
            className="flex items-center justify-center gap-x-1 w-full text-xs mt-4 md:text-sm"
            variant="primary"
          >
            <Plus size={14} /> Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
