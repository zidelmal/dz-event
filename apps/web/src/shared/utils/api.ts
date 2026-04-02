const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

type QueryParams = Record<string, string | number | boolean | undefined>;

function toQueryString(params: QueryParams) {
  const query = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
  return query ? `?${query}` : '';
}

export async function apiClient<T>(url: string, init?: RequestInit, query?: QueryParams): Promise<T> {
  const queryString = query ? toQueryString(query) : '';
  const response = await fetch(`${API_BASE_URL}${url}${queryString}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API fetch failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data as T;
}
