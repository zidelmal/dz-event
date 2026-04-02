const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

  const base = API_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001');
  const endpoint = new URL(`${url}${queryString}`, base).toString();

  const hasFormData = init?.body && init.body instanceof FormData;

  let response: Response;
  try {
    response = await fetch(endpoint, {
      ...init,
      headers: {
        ...(hasFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(init?.headers || {}),
      },
    });
  } catch (e) {
    throw new Error(`Unable to fetch from ${endpoint}. Vérifie que le backend est lancé et que CORS autorise cette requête. (${(e as Error).message})`);
  }

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API fetch failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  return data as T;
}
