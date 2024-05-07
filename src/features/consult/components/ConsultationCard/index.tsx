import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/common';

const ConsultationCard = () => {
  return (
    <div className="border border-primary-border rounded-lg cursor-pointer">
      <Link href="/profile/my-orders/panadol-obat-pusing">
        <div className="flex justify-between gap-x-4 px-4 py-2">
          <Image
            src="https://images.unsplash.com/photo-1598046937895-2be846402c0d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-full w-20 h-20"
            width={600}
            height={300}
            alt=""
          />
          <div className="flex justify-between w-full h-fit">
            <div className=" flex flex-col gap-1">
              <span className="font-poppins font-medium text-xs text-dark md:text-lg">
                Manusia Sakit
              </span>
              <span className="font-medium text-dark-gray">Male, 17 y.o</span>
              <span className="font-medium text-dark-gray text-xs text-dark md:text-sm">
                Started on Mar 12, 11:21 AM
              </span>
            </div>
            <div className="flex flex-col justify-between">
              <Badge>Delivered</Badge>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ConsultationCard;
