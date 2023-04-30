/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { RiCloseLine } from 'react-icons/ri';

export default function Modal(props: ModalProps) {
  return (
    <div css={style} style={{ display: props.showing ? 'flex' : 'none' }}>
      <div className="modal-window">
        {props.title && <h2 className="modal-title">{props.title}</h2>}
        {props.children}
        <span className="modal-close-button" onClick={props.onClose}>
          <RiCloseLine />
        </span>
      </div>
    </div>
  );
}

interface ModalProps {
  title?: ReactNode;
  children?: ReactNode;
  showing: boolean;
  onClose: () => void;
}

const style = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.25);

  .modal-window {
    position: relative;
    width: 500px;
    height: 600px;
    padding: 45px 15px;
    box-sizing: border-box;

    background-color: white;
    border-radius: 5px;
  }

  .modal-title {
    margin-top: 0;
  }

  .modal-close-button {
    position: absolute;
    top: 15px;
    right: 15px;

    font-size: 24px;

    cursor: pointer;

    &:hover {
      opacity: 0.6;
    }
  }
`;
