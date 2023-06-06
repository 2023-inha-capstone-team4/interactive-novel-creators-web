/** @jsxImportSource @emotion/react */

import { Novel } from '@/types/Novel';
import { css } from '@emotion/react';
import { RiAddCircleLine, RiShareBoxLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import EpisodeList from './EpisodeList';

/**
 * 노벨 리스트 컴포넌트입니다.
 */
export default function NovelList(props: NovelListProps) {
  const navigate = useNavigate();

  // 상태: 에피소드 다이얼로그
  const [episodeDialogOpen, setEpisodeDialogOpen] = useState<boolean>(false);
  const [selectedNovelId, setSelectedNovelId] = useState<number | null>(null);

  /** 해당 노벨의 에피소드 다이얼로그를 표시합니다. */
  const openDialog = (novelId: number) => {
    setSelectedNovelId(novelId);
    setEpisodeDialogOpen(true);
  };

  /** 열려 있는 에피소드 다이얼로그를 닫습니다. */
  const closeDialog = () => {
    setEpisodeDialogOpen(false);
    setSelectedNovelId(null);
  };

  return (
    <>
      <ul css={style}>
        {props.novels.map((novel) => (
          <li className="novellist-item" key={novel.id}>
            <div style={{ position: 'relative' }}>
              <img src={novel.novelImageUrl} className="novellist-item-thumbnail" alt="thumbnail" />
              <div className="novellist-item-cover">
                <Link to={`${process.env.REACT_APP_READER_SERVICE_URL}novel/${novel.id}`}>
                  <div className="novellist-item-cover-link">
                    <RiShareBoxLine />
                    <p>독자 서비스에서 보기</p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="novellist-item-info">
              <h3>{novel.novelName}</h3>
              <p className="novellist-item-description">{novel.novelIntroduce}</p>
            </div>
            <div className="novellist-item-buttons">
              <Button variant="contained" onClick={() => openDialog(novel.id)}>
                에피소드
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/novels/${novel.id}/update`, { state: novel })}
              >
                정보 수정
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Dialog open={episodeDialogOpen} onClose={closeDialog} fullWidth>
        <DialogTitle>에피소드</DialogTitle>
        <DialogContent>
          <Button
            startIcon={<RiAddCircleLine />}
            onClick={() => navigate(`/novels/${selectedNovelId}/editor`)}
          >
            새 에피소드 작성
          </Button>
          <Box paddingY={3}>{selectedNovelId && <EpisodeList novelId={selectedNovelId} />}</Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface NovelListProps {
  novels: Novel[];
}

const style = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-gap: 30px 60px;

  .novellist-item {
    width: 280px;
    padding: 20px 20px;
    background-color: #fff;
    border: 1px solid var(--color-accent);
    border-radius: 5px;
  }

  .novellist-item-thumbnail {
    width: 280px;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid var(--color-accent);
  }

  .novellist-item-info {
    & > h3 {
      margin: 5px 0;
      font-size: 16px;
    }

    & > p {
      margin: 3px 0;
      color: var(--color-text-light);
      font-size: 14px;
    }

    .novellist-item-description {
      width: inherit;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .novellist-item-cover {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: #000;
    border-radius: 4px;
    opacity: 0;

    &:hover {
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
  }

  .novellist-item-cover-link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    height: 100%;

    color: var(--color-text-white);

    & > p {
      margin-left: 5px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .novellist-item-buttons {
    margin-top: 30px;
    text-align: center;
    & > * {
      margin: 0 3px;
    }
  }
`;
