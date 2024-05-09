'use client';

import { Button } from '@/components/common';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { addPrescriptionToCart } from '../../actions/consultation';
import { toast } from 'react-toastify';

const AddToCartButton = () => {
  const { id } = useParams();
  const addToCart = async () => {
    setIsLoading(true);
    try {
      await addPrescriptionToCart(`${id}`);
      toast.success('successfully added to cart');
    } catch (err) {
      toast.error((err as Error).message);
    }
    setIsLoading(false);
  };
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button loading={isLoading} onClick={addToCart} className="min-h-[44px]">
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
