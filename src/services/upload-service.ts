import NovelAPI from '@/apis/NovelAPI';

export async function uploadFile(novelId: number, type: string, file: File) {
  const response = await NovelAPI.uploadAsset(novelId, type, file);
  const data = response.data;
  const url = data[0];
  return url;
}
