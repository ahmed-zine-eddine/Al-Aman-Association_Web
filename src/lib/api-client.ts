import { ApiResponse } from "./api-types";

const API_BASE = import.meta.env.VITE_API_URL; // Proxied in Vite

export class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public errors?: any,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers || {});

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("accessToken");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`${API_BASE}${url}`, { ...options, headers });

  // Handle Token Expiration
  if (response.status === 401 && token) {
    // Try to refresh token
    const refreshRes = await fetch(`${API_BASE}/auth/refresh`, { method: "POST" });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem("accessToken", data.data.accessToken);

      // Retry original request
      headers.set("Authorization", `Bearer ${data.data.accessToken}`);
      response = await fetch(`${API_BASE}${url}`, { ...options, headers });
    } else {
      localStorage.removeItem("accessToken");
      window.location.href = "/admin/login";
    }
  }

  return response;
}

export const apiClient = {
  async get<T>(url: string): Promise<ApiResponse<T>> {
    const res = await fetchWithAuth(url);
    const data = await res.json();
    if (!res.ok) throw new ApiError(data.message || "Request failed", res.status, data.errors);
    return data;
  },

  async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    const res = await fetchWithAuth(url, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new ApiError(data.message || "Request failed", res.status, data.errors);
    return data;
  },

  async put<T>(url: string, body: any): Promise<ApiResponse<T>> {
    const res = await fetchWithAuth(url, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new ApiError(data.message || "Request failed", res.status, data.errors);
    return data;
  },

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const res = await fetchWithAuth(url, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) throw new ApiError(data.message || "Request failed", res.status, data.errors);
    return data;
  },
};
