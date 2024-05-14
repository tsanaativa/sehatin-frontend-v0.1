'use server';

import { PharmaciesInCartProps } from '@/features/cart/components/Cart';
import {
  Cart,
  NonOfficialMethod,
  OfficialMethod,
  OrderRequest,
  ShipmentRequest,
} from '@/types/Cart';
import { get, put, post } from '@/utils/api';
import { getSession } from './session';
import shipmentmethod from '@/constants/shippingmethod';

export const getCart = async (): Promise<{
  pharmacies: PharmaciesInCartProps[];
  address: { id: number; address: string; is_main: boolean }[];
}> => {
  try {
    const { user } = await getSession();
    const res = await get<Cart[]>('/carts');
    const pharmacies: PharmaciesInCartProps[] = [];
    res.data.forEach((r) => {
      const product = {
        id: r.id,
        picture: r.product_picture,
        name: r.product_name,
        price: +r.price,
        label: r.selling_unit,
        inCart: r.quantity,
        weight: r.weight,
        stock: r.total_stock,
        is_available: r.is_available,
        slug: r.slug_id,
      };
      if (!pharmacies.map((p) => p.name).includes(r.pharmacy_name)) {
        const official = r.shipping_methods.official.map(
          (s) =>
            ({
              id: s.id,
              name: s.name.toLowerCase().split('official ')[1],
            }) as OfficialMethod
        );
        const nonOfficial = r.shipping_methods.non_official.map(
          (s) =>
            ({
              id: s.id,
              name: s.courier,
            }) as NonOfficialMethod
        );
        pharmacies.push({
          name: r.pharmacy_name,
          id: r.pharmacy_id,
          shippingMethods: {
            official,
            nonOfficial,
          },
          products: [],
        });
      }
      const idxOfPharmacy = pharmacies.findIndex(
        (p) => p.name == r.pharmacy_name
      );
      pharmacies[idxOfPharmacy].products.push(product);
    });
    return {
      pharmacies,
      address: user!.addresses.map((a) => ({
        id: a.id,
        address: a.address,
        is_main: a.is_main,
      })),
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const increaseQuantity = async (id: number) => {
  try {
    await put(`/carts/${id}/increase`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const decreaseQuantity = async (id: number) => {
  try {
    await put(`/carts/${id}/decrease`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getShippingCost = async (
  method: OfficialMethod | NonOfficialMethod,
  pharmacy_id: number,
  total_weight: number,
  user_address_id?: number
) => {
  try {
    const { user } = await getSession();
    if (!user_address_id) {
      user_address_id = user?.addresses.find((a) => a.is_main)?.id as number;
    }

    const param: ShipmentRequest = {
      pharmacy_id,
      user_address_id,
      total_weight,
    };

    if (['jne', 'tiki'].includes(method.name)) {
      param.non_official_shipping_method_id = method.id;
    } else {
      param.official_shipping_method_id = method.id;
    }

    const res = await post<{ cost: number }>(
      `/shipping-costs/${['jne', 'tiki'].includes(method.name) ? 'non-' : ''}official`,
      param
    );
    return res.data.cost;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const createOrder = async (param: OrderRequest) => {
  try {
    await post('/users/orders', param);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
