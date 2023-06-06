import { findAccessToken } from '@/services/auth-service';
import { AxiosClient } from './client';
import { Episode, Novel } from '@/types/Novel';
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
    formData.append('file', thumbnail);

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
  updateNovel: (id: number, introduce: string, categories: string[], thumbnail: File | null) => {
    const formData = new FormData();

    // 소개 추가
    formData.append('novelIntroduce', introduce);

    // 카테고리 추가
    formData.append(
      'categories',
      new Blob([JSON.stringify(categories)], { type: 'application/json' }),
    );

    // 썸네일 추가
    if (thumbnail) formData.append('file', thumbnail);

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

  /**
   * 작품의 에피소드 목록을 조회하는 API입니다.
   */
  episodes: (novelId: number, start: number, end: number, order: string = 'desc') => {
    return AxiosClient.get<Episode[]>(
      `/novel/list/detail/${novelId}?startIdx=${start}&endIdx=${end}&order=${order}`,
    );
  },

  /**
   * 작품 에피소드를 업로드하는 API입니다.
   */
  createEpisode: (
    novelId: number,
    name: string,
    introduce: string,
    thumbnail: File,
    jsonData: string,
    imageAssetUrls: string[],
    soundAssetUrls: string[],
  ) => {
    const formData = new FormData();

    formData.append('novelDetailName', name);
    formData.append('novelDetailIntroduce', introduce);
    formData.append('novelDataFile', jsonData);

    formData.append('file', thumbnail);

    const mediaDto = {
      imageList: imageAssetUrls,
      soundList: soundAssetUrls,
    };
    formData.append('mediaDto', new Blob([JSON.stringify(mediaDto)], { type: 'application/json' }));

    return AxiosClient.post(`/novel/reader/${novelId}`, formData, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * 에피소드에서 사용하는 이미지와 사운드 파일을 업로드하는 API입니다.
   * 업로드 완료된 URL들을 업로드한 파일 순서 그대로 반환합니다.
   *
   * @param type image | sound
   */
  uploadAssets: (novelId: number, type: string, files: File[]) => {
    const formData = new FormData();

    formData.append('fileType', type);
    files.forEach((file) => formData.append('files', file));

    return AxiosClient.post<string[]>(`/novel/reader/${novelId}/uploadFile`, formData, {
      headers: {
        Authorization: `Bearer ${findAccessToken()}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadAsset: (novelId: number, type: string, file: File) => {
    return NovelAPI.uploadAssets(novelId, type, [file]);
  },
};

export default NovelAPI;
