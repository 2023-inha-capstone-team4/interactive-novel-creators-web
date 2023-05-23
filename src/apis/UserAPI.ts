import { findAccessToken } from '@/services/auth-service';
import { AxiosClient } from './client';
import { User } from '@/types/User';

const UserAPI = {
  /**
   * 내 정보 조회 API입니다.
   */
  findMyInfo: () => {
    return AxiosClient.get<User>('/reader/info', {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },
};

export default UserAPI;
