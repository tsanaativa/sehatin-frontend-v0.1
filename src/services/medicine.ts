'use server';
import { PaginationInfo } from '@/types/PaginationInfo';
import { Classification, Product } from '@/types/Product';
import { get } from '@/utils/api';
import { getSession } from './session';
import { AdminsParams } from '@/types/Admin';

export const getAllProducts = async (params: AdminsParams) => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      products: Product[];
    }>(`/products`, params);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getAllProductsSelect = async () => {
  try {
    const res = await get<{
      pagination_info: PaginationInfo;
      products: Product[];
    }>(`/products`);
    const data = Object.fromEntries(
      res.data.products.map((d) => [d.id.toString(), d.name])
    );
    return data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getProduct = async (id: number) => {
  try {
    const res = await get<Product>(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw new Error(String((error as Error).message));
  }
};

export const getAllClassifications = async () => {
  const session = await getSession();
  try {
    const res = await get<Classification[]>(
      `/products/classifications`,
      {},
      {
        Authorization: 'Bearer ' + session.access_token,
      }
    );
    const data = Object.fromEntries(
      res.data.map((d) => [d.id.toString(), d.name])
    );
    return data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};

export const getAllForms = async () => {
  const session = await getSession();
  try {
    const res = await get<Classification[]>(
      `/products/forms`,
      {},
      {
        Authorization: 'Bearer ' + session.access_token,
      }
    );
    const data = Object.fromEntries(
      res.data.map((d) => [d.id.toString(), d.name])
    );
    return data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};

export const getAllManufactures = async () => {
  const session = await getSession();
  try {
    const res = await get<Classification[]>(
      `/products/manufactures`,
      {},
      {
        Authorization: 'Bearer ' + session.access_token,
      }
    );
    const data = Object.fromEntries(
      res.data.map((d) => [d.id.toString(), d.name])
    );
    return data;
  } catch (error: any) {
    throw new Error(String(error));
  }
};
