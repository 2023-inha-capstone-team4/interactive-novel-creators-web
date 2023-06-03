/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { RiFileListLine, RiBarChart2Line, RiLandscapeLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';

/**
 * 사이드 Navigation bar 컴포넌트입니다.
 */
export default function Navigation() {
  const { pathname } = useLocation();

  return (
    <div css={style}>
      <Button variant="contained" startIcon={<RiLandscapeLine />}>
        새 작품 만들기
      </Button>
      <ul className="navigation-list">
        <li>
          <Link to="/novels">
            <div className={`navigation-item ${pathname === '/novels' && 'highlight'}`}>
              <RiFileListLine />
              <p>내 작품</p>
            </div>
          </Link>
        </li>
        <li>
          <Link to="/statistics">
            <div className={`navigation-item ${pathname === '/statistics' && 'highlight'}`}>
              <RiBarChart2Line />
              <p>통계</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

const style = css`
  padding: 32px 0 32px 80px;

  .navigation-list {
    margin-top: 20px;
  }

  .navigation-item {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    font-weight: 500;

    & > p {
      margin-left: 5px;
    }

    &:hover {
      color: var(--color-primary);
      transition: color 0.2s ease;
    }
  }

  .highlight {
    color: var(--color-primary);
  }
`;
