/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

export default function ServiceLinks() {
  return (
    <nav css={style}>
      <ul>
        <li>
          <p className="item">
            <a href="http://interactive-novel-web.s3-website.kr.object.ncloudstorage.com/">
              독자 서비스
            </a>
          </p>
        </li>
        <li>
          <p className="item">작가 서비스</p>
        </li>
      </ul>
    </nav>
  );
}

const style = css`
  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    margin: 0;
    padding: 10px 80px 0px;

    & > li {
      margin-right: 10px;
    }
  }

  .item {
    margin: 0;
    font-size: 12px;
    color: #606060;

    a {
      color: #ff6868;
    }
  }
`;
