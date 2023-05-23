import { createContext } from 'react';

export interface AlertAPI {
  (message: string): void;
}

export const AlertAPIContext = createContext<AlertAPI>(() => {});
