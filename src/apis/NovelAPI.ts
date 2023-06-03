import { findAccessToken } from '@/services/auth-service';
import { AxiosClient } from './client';
import { Novel } from '@/types/Novel';
const NovelAPI = {
  /**
   * 소설 생성 API입니다.
   */
  createNovel: (name: string, introduce: string, categories: string[], thumbnail: File) => {
    const formData = new FormData();

    // 이름과 소개 추가
    formData.append('novelName', name);
    formData.append('novelIntroduce', introduce);

    // 카테고리 추가
    formData.append(
      'categories',
      new Blob([JSON.stringify(categories)], { type: 'application/json' }),
    );

    // 썸네일 추가
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

  /**
   * 본인 작품 리스트를 조회하는 API입니다.
   */
  myNovels: (start: number, end: number) => {
    return AxiosClient.get<Novel[]>(`/novel/reader/list?startIdx=${start}&endIdx=${end}`, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
      },
    });
  },
};

export default NovelAPI;
