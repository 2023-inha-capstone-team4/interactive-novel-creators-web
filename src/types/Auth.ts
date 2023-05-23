export interface AuthToken {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresTime: string;
}
