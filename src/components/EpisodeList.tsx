/** @jsxImportSource @emotion/react */

import NovelAPI from '@/apis/NovelAPI';
import { Episode } from '@/types/Novel';
import { AlertAPIContext } from '@/utils/alert';
import { Box, Button, CircularProgress } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

/**
 * 작품의 에피소드 목록 컴포넌트입니다.
 */
export default function EpisodeList({ novelId }: EpisodeListProps) {
  const showAlert = useContext(AlertAPIContext);

  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PAGE_SIZE = 15;

  // 다음 페이지 로드
  const loadMore = () => {
    setIsLoading(true);

    const start = episodes.length;
    const end = start + PAGE_SIZE - 1;

    NovelAPI.episodes(novelId, start, end)
      .then(({ data }) => {
        setEpisodes([...episodes, ...data]);
        setIsLoading(false);
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
        setIsLoading(false);
      });
  };

  useEffect(() => loadMore(), []);

  return (
    <>
      <ul>
        {episodes.map((episode) => (
          <li>
            <img src={episode.novelDetailImageUrl} alt="thumbnail" />
            <div>
              <h3>{episode.novelDetailName}</h3>
            </div>
          </li>
        ))}
      </ul>
      <Box textAlign="center" marginY={2}>
        {isLoading ? <CircularProgress /> : <Button onClick={loadMore}>더 보기</Button>}
      </Box>
    </>
  );
}

interface EpisodeListProps {
  novelId: number;
}
