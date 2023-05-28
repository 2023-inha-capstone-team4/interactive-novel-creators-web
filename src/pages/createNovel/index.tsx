/** @jsxImportSource @emotion/react */

import NovelAPI from '@/apis/NovelAPI';
import Layout from '@/components/Layout';
import { AlertAPIContext } from '@/utils/alert';
import { Button, FilledInput, css } from '@mui/material';
import { ChangeEvent, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emptyImage = require('@/assets/img/empty.png');

/**
 * 작품 생성 페이지입니다.
 */
export default function CreateNovel() {
  const navigate = useNavigate();
  const showAlert = useContext(AlertAPIContext);

  const [name, setName] = useState<string>('');
  const [introduce, setIntroduce] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [thumbnailPreview, setThumbnailPreview] = useState<string>(emptyImage);

  const handleSubmit = () => {
    if (!name) {
      showAlert('작품 이름을 입력해주세요.');
      return;
    }

    if (!introduce) {
      showAlert('작품 소개를 입력해주세요.');
      return;
    }

    if (!thumbnail) {
      showAlert('작품 대표 이미지를 설정해주세요.');
      return;
    }

    NovelAPI.createNovel(name, introduce, thumbnail)
      .then(() => {
        navigate('/novels');
      })
      .catch((e) => {
        showAlert(e.response.data.errorMessage);
      });
  };

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
    <Layout>
      <div css={style}>
        <h2 style={{ marginTop: 0, marginBottom: 30 }}>작품 생성</h2>
        <div className="novel-form">
          <h3>작품 이름</h3>
          <FilledInput
            type="text"
            placeholder="작품 이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <h3>작품 소개</h3>
          <FilledInput
            type="text"
            placeholder="작품 소개를 입력해주세요"
            value={introduce}
            rows={2}
            onChange={(e) => setIntroduce(e.target.value)}
            fullWidth
            multiline
          />
          <h3>작품 대표 이미지</h3>
          <div className="preview-wrapper">
            <img src={thumbnailPreview} />
          </div>
          <Button variant="contained" component="label">
            작품 대표 이미지 추가
            <input type="file" hidden onChange={handleThumbnailChange} />
          </Button>
          <div className="submit-wrapper">
            <Button onClick={handleSubmit}>작품 생성</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const style = css`
  .novel-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    width: 500px;

    & > * {
      margin: 15px 0;
    }
  }

  .preview-wrapper {
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;

    & img {
      width: inherit;
      height: inherit;
    }
  }

  .submit-wrapper {
    text-align: right;
  }
`;
