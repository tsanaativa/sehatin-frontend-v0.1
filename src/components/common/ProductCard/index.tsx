import { Plus } from 'lucide-react';
import { Button } from '..';
import Image from 'next/image';
import { Product } from '@/types/Product';

const ProductCard = () => {
  const dummyProduct: Product = {
    id: 1,
    name: 'Panadol Extra 10 Kaplet 2 box bla',
    selling_unit: 'Box',
    price: 15990,
    generic_name: 'Paracetamol',
    image:
      'https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  return (
    <div className="border-2 border-primary-border rounded-lg md:w-full">
      <Image
        src={dummyProduct.image}
        className="w-full h-24 object-cover rounded-tl-lg rounded-tr-lg"
        width={600}
        height={300}
        alt=""
      />
      <div className="pt-2 pb-3 px-2 md:px-3">
        <div className="min-h-[40px]">
          <span className="font-poppins font-medium text-dark md:text-sm line-clamp-2">
            {dummyProduct.name}
          </span>
        </div>
        <div className="flex flex-col mt-4">
          <span className="font-medium text-[0.75rem] text-dark-gray md:text-sm">
            Per {dummyProduct.selling_unit}
          </span>
          <span className="font-bold text-secondary md:text-sm lg:text-base">
            Rp {dummyProduct.price.toLocaleString('id')}
          </span>
        </div>
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
