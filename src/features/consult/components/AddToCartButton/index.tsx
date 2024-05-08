'use client';

import { Button } from '@/components/common';
import { useParams } from 'next/navigation';

const AddToCartButton = () => {
  const { id } = useParams();
  const addToCart = async () => {};
  return <Button onClick={addToCart}>Add to Cart</Button>;
};

export default AddToCartButton;
