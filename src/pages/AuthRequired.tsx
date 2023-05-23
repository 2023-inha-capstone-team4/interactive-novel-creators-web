import { useAccessToken } from '@/hooks/auth';
import { useUserInfo } from '@/hooks/user';
import { ReactNode } from 'react';

/**
 * 인증이 필요한 페이지 경로들을 모아 관리하기 위한 컴포넌트입니다.
 * 인증 상태가 아닌 경우 ifNoAuth 파라미터로 지정된 페이지를 출력합니다.
 */
export default function AuthRequired(props: AuthRequiredProps) {
  const userInfo = useUserInfo();

  if (!userInfo) {
    return <>{props.ifNoAuth}</>;
  }

  return <>{props.children}</>;
}

interface AuthRequiredProps {
  children?: ReactNode;

  /**
   * 인증이 안되어 있는 경우 출력할 페이지입니다. (e.g. 로그인 페이지)
   */
  ifNoAuth: ReactNode;
}
