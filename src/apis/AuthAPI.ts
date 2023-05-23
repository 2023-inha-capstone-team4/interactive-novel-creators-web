import { AuthToken } from '@/types/Auth';
import { AxiosClient } from './client';
import { useAccessToken, useRefreshToken } from '@/hooks/auth';
import { findAccessToken, findRefreshToken } from '@/services/auth-service';

const AuthAPI = {
  /**
   * 로그인 API입니다.
   *
   * GET 메서드로 바디를 함께 전송하기 위해,
   * Axios가 아닌 XMLHttpRequest로 요청을 전송합니다.
   *
   * 요청이 성공할 경우 토큰 객체를 반환합니다.
   */
  signIn: (signInRequest: SignInRequest) => {
    return AxiosClient.post<AuthToken>('/sign/in/reader', signInRequest);
  },

  /**
   * 액세스 토큰 갱신 API입니다.
   */
  refresh: () => {
    const accessToken = findAccessToken();
    const refreshToken = findRefreshToken();

    return AxiosClient.post<AuthToken>(
      '/refresh',
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  /**
   * Google OAuth 인증 API입니다.
   */
  signInWithGoogleOAuth: (code: string) => {
    return AxiosClient.get<AuthToken>(`/sign/in/oauth2/google?code=${code}`);
  },

  /**
   * 네이버 OAuth 인증 API입니다.
   */
  signInWithNaverOAuth: (code: string, state: string) => {
    return AxiosClient.get<AuthToken>(`/sign/in/oauth2/naver?code=${code}&state=${state}`);
  },
};

/**
 * 로그인에 필요한 요청 타입입니다.
 */
interface SignInRequest {
  email: string;
  password: string;
}

export default AuthAPI;
