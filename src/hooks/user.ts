import { useEffect, useState } from 'react';
import { User } from '../types/User';
import UserAPI from '@/apis/UserAPI';
import { findAccessToken } from '@/services/auth-service';

export function useUserInfo(): User | null {
  const accessToken = findAccessToken(); // dependency
  const [userInfo, setUserInfo] = useState<User>();

  const updateUserInfo = () => {
    UserAPI.findMyInfo()
      .then((resp) => setUserInfo(resp.data))
      .catch(() => {});
  };

  useEffect(() => updateUserInfo(), [accessToken]);

  return userInfo ?? null;
}
