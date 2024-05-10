'use server';

import { post } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createPharmacyProduct = async (formData: FormData) => {
  const rawFormData = {
    price: Number(formData.get('price')),
    total_stock: Number(formData.get('stock')),
    product_id: Number(formData.get('productId')),
    pharmacy_id: Number(formData.get('pharmacyId')),
    is_available: true,
  };

  try {
    await post(
      `/pharmacy-products
      `,
      rawFormData
    );
  } catch (error) {
    let message: string;

    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message);
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'Something went wrong';
    }

    throw new Error(message);
  }

  revalidatePath(`/admin/pharmacy/${rawFormData.pharmacy_id}/product`);
  redirect(`/admin/pharmacy/${rawFormData.pharmacy_id}/product`);
};
