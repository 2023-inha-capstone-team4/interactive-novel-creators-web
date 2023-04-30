/** @jsxImportSource @emotion/react */

import GNB from '@/components/GNB';
import Modal from '@/components/Modal';
import { css } from '@emotion/react';
import { useRef, useState } from 'react';

/**
 * 에디터 페이지입니다.
 */
export default function Editor() {
  const [modalState, setModalState] = useState(false);
  const showModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const enterFullScreenMode = () => {
    iframeRef.current?.requestFullscreen();
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
      <iframe src="http://localhost:3001/" ref={iframeRef} />
      <Modal title="에디터 도움말" showing={modalState} onClose={closeModal}>
        <p>에디터의 다양한 기능을 활용하여 인터렉티브 노벨을 쉽고 빠르게 제작해보세요.</p>
      </Modal>
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
