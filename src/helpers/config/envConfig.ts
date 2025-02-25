export const getBaseUrl =
  import.meta.env.VITE_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1';
export const getOnlyBaseUrl =
  import.meta.env.VITE_PUBLIC_API_ONLY_BASE_URL || 'http://localhost:5000';
export const getSocketBaseUrl =
  import.meta.env.VITE_PUBLIC_SOCKET_BASE_URL || 'http://localhost:5001';

export const config = {
  baseURL: getBaseUrl,
  onlyBaseUrl: getOnlyBaseUrl,
  socketBaseUrl: getSocketBaseUrl,
  env: import.meta.env.NODE_ENV as 'production' | 'development',
};
