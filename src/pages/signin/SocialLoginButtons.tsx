import styled from '@emotion/styled';
import { Divider, Stack } from '@mui/material';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const googleLogo = require('@/assets/img/google-logo.png');
const naverLogo = require('@/assets/img/naver-logo.png');

const GOOGLE_LOGIN_BASEURL = 'https://accounts.google.com/o/oauth2/v2/auth';
const NAVER_LOGIN_BASEURL = 'https://nid.naver.com/oauth2.0/authorize';

export default function SocialLoginButtons() {
  // Google
  const googleLoginParameters = {
    client_id: process.env.REACT_APP_GOOGLE_API_ID,
    redirect_uri: `${process.env.REACT_APP_BASEURL}oauth/google`,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  };

  const googleLoginUrl = GOOGLE_LOGIN_BASEURL + '?' + qs.stringify(googleLoginParameters);

  // NAVER
  // State 값을 로컬 스토리지에 저장
  const state = uuidv4();
  localStorage.setItem('naver-oauth-state', state);

  const naverLoginParameters = {
    response_type: 'code',
    client_id: process.env.REACT_APP_NAVER_API_ID,
    redirect_uri: `${process.env.REACT_APP_BASEURL}oauth/naver`,
    state,
  };

  const naverLoginUrl = NAVER_LOGIN_BASEURL + '?' + qs.stringify(naverLoginParameters);

  return (
    <>
      <Divider variant="middle" />
      <Title>다른 계정으로 로그인</Title>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <SocialLoginButton icon={googleLogo} title="Google" href={googleLoginUrl} />
        <SocialLoginButton icon={naverLogo} title="네이버" href={naverLoginUrl} />
      </Stack>
    </>
  );
}

const Title = styled.p`
  margin: 30px 0 20px;
  font-size: 12px;
  text-align: center;
  color: #777777;
`;

function SocialLoginButton(props: SocialLoginButtonProps) {
  return (
    <Link to={props.href}>
      <ButtonContainer>
        <img src={props.icon} alt="icon" />
        <p>{props.title}</p>
      </ButtonContainer>
    </Link>
  );
}

interface SocialLoginButtonProps {
  icon: string;
  title: string;
  href: string;
}

const ButtonContainer = styled.div`
  width: 60px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  & > img {
    width: inherit;
  }

  & > p {
    margin: 5px 0;
    font-size: 12px;
    color: #777777;
  }
`;
