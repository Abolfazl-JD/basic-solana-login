export interface IResponse<T> {
  status: 'success' | 'error';
  code?: number;
  data?: T;
  message?: string;
  details?: string | object | string[];
}
