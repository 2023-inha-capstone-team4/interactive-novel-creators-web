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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const emptyImage = require('@/assets/img/empty.png');

/**
 * 새 에피소드를 작성하는 에디터 페이지입니다.
 */
export default function CreateEpisode() {
  const showAlert = useContext(AlertAPIContext);

  const { id: idParam } = useParams();
  const novelId = parseInt(idParam!);

  const [modalState, setModalState] = useState(false);
  const showModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

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

    // 에피소드 업로드
    NovelAPI.createEpisode(novelId, name, introduce, thumbnail, novelJsonData, [], []);
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
      <App novelId={novelId} handleSave={handleSave} />
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
