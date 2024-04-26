import Image from 'next/image';
import Badge from '../Badge';
import { Store } from 'lucide-react';
import Link from 'next/link';

const OrderCard = () => {
  return (
    <div className="border border-primary-border rounded-lg cursor-pointer">
      <Link href="/profile/my-orders/panadol-obat-pusing">
        <div className="flex items-center justify-between border-b border-primary-border px-4 py-2">
          <span className="flex items-center gap-x-2 font-medium text-xs text-dark md:text-sm">
            <Store size={18} /> Century Plaza Senayan
          </span>
          <Badge>Delivered</Badge>
        </div>
        <div className="flex justify-between gap-x-4 px-4 py-2">
          <Image
            src="https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-1/6"
            width={600}
            height={300}
            alt=""
          />
          <div className="flex justify-between w-full h-fit">
            <div className=" flex flex-col">
              <span className="font-poppins font-medium text-xs text-dark md:text-base">
                Panadol Obat Pusing
              </span>
              <span className="font-medium text-xs text-dark-gray md:text-sm">
                Mar 12, 2024
              </span>
              <span className="font-medium text-xs text-dark mt-2 md:text-base">
                Total Payment:
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <span className="font-medium text-xs text-dark-gray md:text-base">
                +7 more
              </span>
              <span className="font-semibold text-xs text-secondary md:text-base">
                Rp 15.990
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default OrderCard;
