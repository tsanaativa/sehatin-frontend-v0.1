'use server';

import { post, remove } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPharmacyPartner(id: string, req: any) {
  try {
    await post(`/pharmacy-managers/${id}/pharmacies`, req);
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

  revalidatePath(`/admin/partner/${id}/pharmacy/list`);
  redirect(`/admin/partner/${id}/pharmacy/list`);
}

export async function createPharmacy(req: any) {
  try {
    await post(`/pharmacies`, req);
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

  revalidatePath(`/admin/pharmacy/list`);
  redirect(`/admin/pharmacy/list`);
}

export async function deletePharmacy(id: number) {
  try {
    await remove(`/pharmacies/${id}`);
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
}
