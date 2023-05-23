import { useEffect, useState } from 'react';

/**
 * 로컬 스토리지의 액세스 토큰을 저장하거나 설정하기 위한 함수입니다.
 */
export function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem('access-token'));
  }, []);

  const saveAccessToken = (token: string) => {
    // 상태에 저장
    setAccessToken(token);

    // 로컬 스토리지에 저장
    localStorage.setItem('access-token', token);
  };

  return [accessToken, saveAccessToken];
}

/**
 * 로컬 스토리지의 리프레시 토큰을 저장하거나 설정하기 위한 함수입니다.
 */
export function useRefreshToken() {
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    setRefreshToken(localStorage.getItem('refresh-token'));
  }, []);

  const saveRefreshToken = (token: string) => {
    // 상태에 저장
    setRefreshToken(token);

    // 로컬 스토리지에 저장
    localStorage.setItem('refresh-token', token);
  };

  return [refreshToken, saveRefreshToken];
}
