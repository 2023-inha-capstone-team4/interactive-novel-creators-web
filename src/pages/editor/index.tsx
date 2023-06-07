/** @jsxImportSource @emotion/react */

import NovelAPI from '@/apis/NovelAPI';
import GNB from '@/components/GNB';
import Modal from '@/components/Modal';
import App from '@/libs/editor/src/App';
import { findAccessToken } from '@/services/auth-service';
import { listenMessage, sendMessage } from '@/services/editor-event-service';
import { AlertAPIContext } from '@/utils/alert';
import { css } from '@emotion/react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const emptyImage = require('@/assets/img/empty.png');

/**
 * 새 에피소드를 작성하는 에디터 페이지입니다.
 */
export default function Editor() {
  const showAlert = useContext(AlertAPIContext);
  const navigate = useNavigate();

  // 노벨 ID
  const { id: idParam } = useParams();
  const novelId = parseInt(idParam!);

  // 회차 ID
  const [searchParams] = useSearchParams();
  const episodeParam = searchParams.get('episode');
  const episodeId = episodeParam ? parseInt(episodeParam) : null;

  const [modalState, setModalState] = useState(false);
  const showModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  // 에피소드 로딩 중인지
  const [loadingEpisode, setLoadingEpisode] = useState(episodeId ? true : false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const enterFullScreenMode = () => {
    iframeRef.current?.requestFullscreen();
  };

  // 상태: 업로드할 작품 데이터
  const [name, setName] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [novelJsonData, setNovelJsonData] = useState<string>('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(emptyImage);

  // 상태: 작품 정보 입력 다이얼로그
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // 저장 버튼 클릭 핸들러
  const handleSave = (jsonData: string) => {
    setNovelJsonData(jsonData);
    setDialogOpen(true);
  };

  /** 에피소드를 업로드합니다. */
  const handleSubmitEpisode = () => {
    if (!name) {
      showAlert('작품 이름을 작성해주세요.');
      return;
    }

    if (!introduce) {
      showAlert('작품 소개를 작성해주세요.');
      return;
    }

    if (!thumbnail) {
      showAlert('작품 썸네일을 등록해주세요.');
      return;
    }

    // 업로드
    if (episodeId) {
      // 수정
      NovelAPI.updateEpisode(
        novelId,
        episodeId,
        name,
        introduce,
        thumbnail,
        novelJsonData,
        [],
        [],
      ).then(() => {
        navigate('/novels');
      });
    } else {
      // 등록
      NovelAPI.createEpisode(novelId, name, introduce, thumbnail, novelJsonData, [], []).then(
        () => {
          navigate('/novels');
        },
      );
    }
  };

  /** 썸네일 이미지 입력란 변경에 대한 이벤트 핸들러 함수입니다. */
  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      showAlert('이미지 업로드 중 문제가 발생했습니다.');
      return;
    }

    const file = files.item(0);
    if (!file) {
      showAlert('이미지 업로드 중 문제가 발생했습니다.');
      return;
    }

    setThumbnail(file);

    const objectUrl = URL.createObjectURL(file);
    setThumbnailPreview(objectUrl);
  };

  // 회차를 수정하는 경우, 회차 데이터를 불러옵니다.
  useEffect(() => {
    if (!episodeId) return;

    // 회차 정보 요청
    NovelAPI.episode(episodeId).then(({ data }) => {
      setName(data.novelDetailName);
      setIntroduce(data.novelDetailIntroduce);
      setNovelJsonData(data.novelData);

      setLoadingEpisode(false);
    });
  }, [episodeId]);

  if (loadingEpisode) {
    return (
      <Box padding={5} textAlign="center">
        <CircularProgress />
        <p>에피소드 데이터 로딩 중...</p>
      </Box>
    );
  }

  return (
    <div css={style}>
      <GNB
        addOns={
          <ul className="tools">
            <li onClick={enterFullScreenMode}>전체 화면</li>
            <li onClick={showModal}>에디터 도움말</li>
          </ul>
        }
      />
      {/* <iframe src={process.env.REACT_APP_EDITOR_URL} ref={iframeRef} /> */}
      <App novelId={novelId} handleSave={handleSave} jsonData={novelJsonData} />
      <Modal title="에디터 도움말" showing={modalState} onClose={closeModal}>
        <p>에디터의 다양한 기능을 활용하여 인터렉티브 노벨을 쉽고 빠르게 제작해보세요.</p>
      </Modal>

      <Dialog open={dialogOpen} fullWidth onClose={() => setDialogOpen(false)}>
        <DialogTitle>작품 정보를 작성해주세요</DialogTitle>
        <DialogContent>
          <h3>작품 이름</h3>
          <TextField
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <h3>작품 소개</h3>
          <TextField
            autoFocus
            type="text"
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            rows={5}
            multiline
            fullWidth
          />
          <Button variant="contained" component="label">
            작품 대표 이미지 추가
            <input type="file" hidden onChange={handleThumbnailChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>취소</Button>
          <Button onClick={handleSubmitEpisode}>업로드</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const style = css`
  iframe {
    width: 100%;
    height: 791px;
  }

  .tools {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    & > li {
      margin-right: 30px;
      cursor: pointer;
    }
  }
`;