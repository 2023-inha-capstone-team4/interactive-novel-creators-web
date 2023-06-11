/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react';
import { css } from '@emotion/react';
import GNB from './GNB';
import Navigation from './Navigation';
import ServiceLinks from './ServiceLinks';

/**
 * 기본 레이아웃 컴포넌트입니다.
 */
export default function Layout({ children }: LayoutProps) {
  return (
    <div css={style}>
      <ServiceLinks />
      <GNB />
      <div className="container">
        <div className="navigation-container">
          <Navigation />
        </div>
        <main>{children}</main>
      </div>
    </div>
  );
}

interface LayoutProps {
  children?: ReactNode;
}

const style = css`
  --width-navigation: 240px;
  --height-gnb: 61px;

  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .navigation-container {
    width: var(--width-navigation);
    min-height: calc(100vh - var(--height-gnb));
  }

  main {
    width: calc(100vw - var(--width-navigation));
    min-height: calc(100vh - var(--height-gnb));
    padding: 32px 32px 200px 32px;
    box-sizing: border-box;

    background: var(--color-background);
    border-left: 1px solid var(--color-accent);
  }
`;
