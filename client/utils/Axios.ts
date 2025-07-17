// lib/axios.ts
import axios from 'axios';
import { GetCookie } from '@/components/auth/cookies';

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosAuth.interceptors.request.use(async (config) => {
  const token = GetCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosAuth;
