const env = import.meta.env.VITE_PUBLIC_NODE_ENV as
  | 'production'
  | 'development';

export const configEnv = {
  baseURL:
    env === 'development'
      ? import.meta.env.VITE_PUBLIC_API_BASE_URL
      : import.meta.env.VITE_PUBLIC_API_BASE_URL_LIVE,
  onlyBaseUrl:
    env === 'development'
      ? import.meta.env.VITE_PUBLIC_API_ONLY_BASE_URL
      : import.meta.env.VITE_PUBLIC_API_ONLY_BASE_URL_LIVE,
  socketBaseUrl:
    env === 'development'
      ? import.meta.env.VITE_PUBLIC_SOCKET_BASE_URL
      : import.meta.env.VITE_PUBLIC_SOCKET_BASE_URL_LIVE,
  env: import.meta.env.VITE_PUBLIC_NODE_ENV as 'production' | 'development',
};
