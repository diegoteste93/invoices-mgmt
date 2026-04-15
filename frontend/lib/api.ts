const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function requestWithRetry(input: string, init?: RequestInit, retries = 3): Promise<Response> {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(input, { ...init, cache: 'no-store' });
      return res;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 300 * (i + 1)));
    }
  }
  throw lastError;
}

export async function apiGet<T>(path: string, fallback?: T): Promise<T> {
  try {
    const res = await requestWithRetry(`${API_URL}${path}`);
    if (!res.ok) throw new Error(`Erro de API: ${res.status}`);
    return res.json();
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  }
}

export async function apiPost<T>(path: string, body: unknown, fallback?: T): Promise<T> {
  try {
    const res = await requestWithRetry(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) throw new Error(`Erro de API: ${res.status}`);
    return res.json();
  } catch (error) {
    if (fallback !== undefined) return fallback;
    throw error;
  }
}
