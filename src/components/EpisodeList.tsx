/** @jsxImportSource @emotion/react */

import NovelAPI from '@/apis/NovelAPI';
import { Episode } from '@/types/Novel';
import { AlertAPIContext } from '@/utils/alert';
import { Box, Button, CircularProgress, css } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div css={style}>
      <ul>
        {episodes.map((episode) => (
          <li>
            <img src={episode.novelDetailImageUrl} alt="thumbnail" />
            <div>
              <h3>{episode.novelDetailName}</h3>
              <Link to={`/novels/${novelId}/editor?episode=${episode.id}`}>에디터에서 수정</Link>
            </div>
          </li>
        ))}
      </ul>
      <Box textAlign="center" marginY={2}>
        {isLoading ? <CircularProgress /> : <Button onClick={loadMore}>더 보기</Button>}
      </Box>
    </div>
  );
}

interface EpisodeListProps {
  novelId: number;
}

const style = css`
  li {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;

    height: 85px;

    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 4px;
    }

    div {
      margin-left: 15px;

      h3 {
        margin: 5px 0 10px 0;
      }

      a {
        font-size: 14px;
        color: var(--color-primary);
      }
    }
  }
`;
