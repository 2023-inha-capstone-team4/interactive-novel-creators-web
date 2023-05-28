/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Button, FormControl, InputLabel, OutlinedInput, Stack } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import SocialLoginButtons from './SocialLoginButtons';
import { signIn } from '@/services/auth-service';
import { AlertAPIContext } from '@/utils/alert';

export default function Signin() {
  const showAlert = useContext(AlertAPIContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    // 로그인 API 호출
    signIn(email, password)
      .then(() => window.location.reload())
      .catch(() => showAlert('로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.'));
  };

  return (
    <div css={style}>
      <main>
        <Stack direction="column" spacing={2}>
          <header>
            <h3>Interactive Novel</h3>
            <p>작가 서비스를 사용하려면 로그인이 필요합니다.</p>
          </header>
          <FormControl>
            <InputLabel htmlFor="input-email">이메일</InputLabel>
            <OutlinedInput
              type="email"
              id="input-email"
              placeholder="이메일을 입력해주세요"
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="input-password">비밀번호</InputLabel>
            <OutlinedInput
              type="password"
              id="input-password"
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>
          <Button onClick={handleSubmit} variant="contained" fullWidth>
            로그인
          </Button>
        </Stack>
        {/* <SocialLoginButtons /> */}
      </main>
    </div>
  );
}

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 50px;

  main {
    width: 500px;
    height: 400px;
    padding: 30px 15px;
  }

  header {
    padding-bottom: 50px;
    text-align: center;

    p {
      font-size: 12px;
    }
  }
`;
