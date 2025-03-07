'use server';

import { PUBLIC_API_ROUTES } from '@/constants/routes';
import { interceptor } from './interceptor';
import { getSession } from '../services/session';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

type ApiParam = {
  url: string;
  headers?: Record<string, string>;
  method?: string;
};

async function request<T>(
  {
    url,
    headers = {
      'Content-Type': 'application/json',
    },
    method = 'GET',
  }: ApiParam,
  param?: any,
  formData?: FormData
): Promise<{ message: string; data: T }> {
  const session = await getSession();
  headers = PUBLIC_API_ROUTES.some((p) => url.includes(p))
    ? headers
    : {
        ...headers,
        Authorization: 'Bearer ' + session?.access_token,
      };
  const options: RequestInit = {
    method,
    headers,
  };

  await interceptor(url);

  if (param) {
    if (method === 'GET') {
      url += '?' + new URLSearchParams(param);
    } else {
      if (formData) {
        options.body = formData;
      } else {
        options.body = JSON.stringify(param);
      }
    }
  }

  const response = await fetch(BASE_URL + url, options);
  const result = await response.json();
  if (!response.ok) {
    const message =
      result.message ??
      result.errors
        .map((err: { field: string; message: string }) =>
          err.message
            .toLowerCase()
            .replaceAll('this field', err.field.toLowerCase())
        )
        .join('. ');
    throw new Error(message);
  }

  return result;
}

export async function get<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers }, params);
}

export async function post<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers'],
  formData?: FormData
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'POST' }, params, formData);
}

export async function patch<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers'],
  formData?: FormData
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PATCH' }, params, formData);
}

export async function put<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers'],
  formData?: FormData
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PUT' }, params, formData);
}

export async function remove<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'DELETE' }, params);
}
