import axios, { AxiosResponse } from 'axios';

/**
 * API 요청을 위한 Axios 클라이언트 인스턴스입니다.
 */
const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  timeout: 10000,
});

/**
 * Axios 인터셉터를 정의하는 인터페이스입니다.
 */
interface Interceptor {
  (response: AxiosResponse): AxiosResponse;
}

/**
 * 날짜를 표현하는 문자열을 Date로 변환하는 Axios 인터셉터입니다.
 */
const dateDeserializingInterceptor: Interceptor = (response) => {
  const isoFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;
  const handleDate = (obj: any) => {
    if (typeof obj !== 'object' || !obj) return;

    for (const key of Object.keys(obj)) {
      const value = obj[key];

      if (typeof value === 'string' && isoFormatRegex.test(value)) {
        obj[key] = new Date(value);
      } else if (typeof value === 'object') {
        handleDate(value);
      }
    }
  };

  handleDate(response.data);
  return response;
};

// 인터셉터 추가
AxiosClient.interceptors.response.use(dateDeserializingInterceptor);

export { AxiosClient };
