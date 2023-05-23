/** @jsxImportSource @emotion/react */

import Logo from './Logo';
import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { Button } from '@mui/material';
import { signOut } from '@/services/auth-service';

/**
 * 상단 Global navigation bar 컴포넌트입니다.
 */
export default function GNB(props: GNBProps) {
  return (
    <div css={style}>
      <div className="gnb-left-side">
        <Logo />
        {props.addOns && <span>{props.addOns}</span>}
      </div>
      <Button onClick={signOut}>로그아웃</Button>
    </div>
  );
}

interface GNBProps {
  addOns?: ReactNode; // GNB에 추가하고 싶은 컴포넌트
}

const style = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 80px;
  height: 60px;

  border-bottom: 1px solid var(--color-accent);

  .gnb-left-side {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > span {
      margin-left: 50px;
    }
  }

  .gnb-account {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-weight: 500;

    & > p {
      margin-left: 5px;
      font-size: 14px;
    }
  }
`;
