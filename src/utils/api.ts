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

export type ErrorProps = {
  code: number;
  codeName: string;
  message: string;
};

export const isApiError = (object: any): object is ErrorProps =>
  'code' in object && 'codeName' in object && 'message' in object;

async function request<T>(
  {
    url,
    headers = {
      'Content-Type': 'application/json',
    },
    method = 'GET',
  }: ApiParam,
  param?: any
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
    console.log(param, headers['Content-Type'] == 'multipart/form-data');
    if (method === 'GET') url += '?' + new URLSearchParams(param);
    else if (headers['Content-Type'] == 'multipart/form-data')
      options.body = param;
    else options.body = JSON.stringify(param);
  }

  const response = await fetch(BASE_URL + url, options);
  const result = await response.json();
  if (!response.ok) {
    const error: ErrorProps = {
      code: response.status,
      codeName: response.statusText,
      message:
        result.message ??
        result.errors
          .map((err: { field: string; message: string }) =>
            err.message
              .toLowerCase()
              .replaceAll('this field', err.field.toLowerCase())
          )
          .join('. '),
    };
    throw error;
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
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'POST' }, params);
}

export async function patch<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PATCH' }, params);
}

export async function put<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PUT' }, params);
}

export async function remove<T>(
  url: ApiParam['url'],
  params?: any,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'DELETE' }, params);
}
