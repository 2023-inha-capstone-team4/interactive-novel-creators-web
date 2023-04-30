import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import '@/styles/globals.scss';
import { AxiosClient } from './utils/axios';
import { SWRConfig } from 'swr';

/**
 * SWR 설정을 위한 객체입니다.
 */
const swrOptions = {
  fetcher: (url: string) => AxiosClient.get(url).then((res) => res.data),
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <SWRConfig value={swrOptions}>
      <App />
    </SWRConfig>
  </React.StrictMode>,
);
