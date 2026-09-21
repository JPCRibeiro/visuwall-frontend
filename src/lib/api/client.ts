import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

export const BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8080';

export type ApiErrorField = {
  field: string;
  message: string;
}

export type ApiErrorBody = {
  timestamp: string;
  status: number;
  detail?: string;
  title?: string;
  instance?: string;
}

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  const axiosError = error as AxiosError<ApiErrorBody>;

  if (axiosError.response) {
    const body = axiosError.response.data;
    
    return new ApiError(
      body?.detail ?? `Falha na requisição (${axiosError.response.status})`,
      axiosError.response.status,
      body
    );
  }

  if (axiosError.code === 'ECONNABORTED') {
    return new ApiError('Tempo de conexão esgotado', 0);
  }

  return new ApiError('Não foi possível conectar ao servidor', 0);
}

const config = {
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
};

export const publicApi = axios.create(config);
export const api = axios.create(config);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

export type RetriableConfig = InternalAxiosRequestConfig & { _retried?: boolean };