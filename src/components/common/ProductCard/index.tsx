import { PharmacyProductUser } from '@/types/Product';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '..';

type ProductCardProps = {
  width?: string;
  product: PharmacyProductUser;
  isAuthenticated: boolean;
};

const ProductCard = ({ width, product, isAuthenticated }: ProductCardProps) => {
  return (
    <Link href={`/meds/${product.slug_id}/${product.id}`}>
      <div
        className={`border-2 border-primary-border rounded-lg md:w-full min-w-[185px] ${width}`}
      >
        <Image
          src={product.product_picture}
          className="w-full h-24 object-cover rounded-tl-lg rounded-tr-lg"
          width={600}
          height={300}
          alt=""
        />
        <div className="pt-2 pb-3 px-2 md:px-3">
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
          <Button
            className="flex items-center justify-center gap-x-1 w-full text-xs mt-4 md:text-sm"
            variant="primary"
            disabled={!isAuthenticated}
            type="button"
          >
            <Plus size={14} /> Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
