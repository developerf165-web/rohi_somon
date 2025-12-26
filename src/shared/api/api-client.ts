/**
 * Consolidated Native Fetch API client
 */

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Main API client using native fetch
 * Consistently handles authentication and errors
 */
export const apiClient = {
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, headers, ...rest } = options;
    
    // 1. Handle URL Query Parameters
    let url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += (url.includes('?') ? '&' : '?') + searchParams.toString();
    }

    // 2. Prepare Headers
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('auth_token');
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const finalHeaders = {
      ...defaultHeaders,
      ...headers,
    };

    // 3. Make the request
    const response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
    });

    // 4. Handle Global Interceptors (like 401)
    if (response.status === 401) {
      localStorage.removeItem('auth_token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }

    // 5. Handle Errors
    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        // Fallback for non-JSON errors
      }
      throw { response, data: errorData };
    }

    // 6. Parse JSON data
    const text = await response.text();
    return text ? JSON.parse(text) : ({} as T);
  },

  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  put<T>(endpoint: string, data?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
