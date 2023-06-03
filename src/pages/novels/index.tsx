import NovelAPI from '@/apis/NovelAPI';
import Layout from '@/components/Layout';
import NovelList from '@/components/NovelList';
import { Novel } from '@/types/Novel';
import { AlertAPIContext } from '@/utils/alert';
import { Box, Button, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';

/**
 * 내 작품 페이지입니다.
 */
export default function Novels() {
  const showAlert = useContext(AlertAPIContext);

  const [novels, setNovels] = useState<Novel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PAGE_SIZE = 15;

  /** 노벨을 `PAGE_SIZE`만큼 추가로 로드합니다. */
  const loadMore = () => {
    setIsLoading(true);

    const start = novels.length;
    const end = start + PAGE_SIZE - 1;

    NovelAPI.myNovels(start, end)
      .then(({ data }) => {
        setNovels([...novels, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  // 최초 로딩
  useEffect(() => loadMore(), []);

  return (
    <Layout>
      <h2 style={{ marginTop: 0, marginBottom: 30 }}>내 작품</h2>
      <NovelList novels={novels} />
      <Box textAlign="center" marginY={5}>
        {isLoading ? <CircularProgress /> : <Button onClick={loadMore}>더 보기</Button>}
      </Box>
    </Layout>
  );
}
