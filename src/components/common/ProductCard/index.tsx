import { Plus } from 'lucide-react';
import Image from 'next/image';
import { Button } from '..';

const ProductCard = () => {
  return (
    <div className="border-2 border-primary-border rounded-lg md:w-full">
      <Image
        src="https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-full h-24 object-cover rounded-tl-lg rounded-tr-lg"
        width={600}
        height={300}
        alt=""
      />
      <div className="mt-4 px-2 pb-2">
        <span className="font-poppins font-medium text-dark md:text-sm">
          Panadol Obat Pusing
        </span>
        <div className="flex flex-col mt-4">
          <span className="font-medium text-[0.75rem] text-dark-gray">
            Per Box
          </span>
          <span className="font-bold text-secondary md:text-sm">Rp 15.990</span>
        </div>
        <Button className="flex items-center justify-center gap-x-1 w-full text-[0.625rem] mt-4">
          <Plus size={14} /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
