import { interceptor } from './interceptor';

const base = process.env.BASE_URL as string;

type ApiParam = {
  url: string;
  headers?: Record<string, string>;
  method?: string;
};

async function request<S, T>(
  {
    url,
    headers = { 'Content-Type': 'application/json' },
    method = 'GET',
  }: ApiParam,
  param?: S
): Promise<{ message: string; data: T }> {
  const options: RequestInit = {
    method,
    headers,
    credentials: 'include',
  };

  await interceptor(url);

  if (param) {
    if (method === 'GET') url += '?' + new URLSearchParams(param);
    else options.body = JSON.stringify(param);
  }

  const response = await fetch(base + url, options);
  const result = await response.json();
  if (!response.ok)
    throw {
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

  return result;
}

function get<S, T>(
  url: ApiParam['url'],
  params?: S,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers }, params);
}

function post<S, T>(
  url: ApiParam['url'],
  params?: S,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'POST' }, params);
}

function patch<S, T>(
  url: ApiParam['url'],
  params?: S,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PATCH' }, params);
}

function put<S, T>(
  url: ApiParam['url'],
  params?: S,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'PUT' }, params);
}

function remove<S, T>(
  url: ApiParam['url'],
  params?: S,
  headers?: ApiParam['headers']
): Promise<{ message: string; data: T }> {
  return request({ url, headers, method: 'DELETE' }, params);
}

const api = { get, post, patch, put, remove };
export default api;
