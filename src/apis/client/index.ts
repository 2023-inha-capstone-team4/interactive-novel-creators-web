import axios, { AxiosResponse } from 'axios';
import { dateDeserializingInterceptor } from './interceptors';

/**
 * API 요청을 위한 Axios 클라이언트 인스턴스입니다.
 */
const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 10000,
});

// 인터셉터 추가
AxiosClient.interceptors.response.use(dateDeserializingInterceptor);

export { AxiosClient };
