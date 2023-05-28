import { findAccessToken } from '@/services/auth-service';
import { AxiosClient } from './client';
import { Novel } from '@/types/Novel';
const NovelAPI = {
  /**
   * 소설 생성 API입니다.
   */
  createNovel: (name: string, introduce: string, thumbnail: File) => {
    const formData = new FormData();
    formData.append('novelName', name);
    formData.append('novelIntroduce', introduce);
    if (thumbnail) formData.append('file', thumbnail);

    return AxiosClient.post<Novel>('/novel/reader', formData, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * 소설 정보 수정 API입니다.
   */
  updateNovel: (id: number, introduce: string, thumbnail: File) => {
    const formData = new FormData();
    formData.append('novelIntroduce', introduce);
    formData.append('file', thumbnail);

    return AxiosClient.patch<Novel>(`/novel/reader/${id}/modify`, formData, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default NovelAPI;
