import { ReactNode } from 'react';

export interface GlobalState {
  openConfigurator: boolean;
  openSideNav: boolean;
  activeConfigurator: string;
}

export interface GlobalStateContextProps {
  valueStore: GlobalState;
  dispatch: React.Dispatch<React.SetStateAction<GlobalState>>;
}

export interface GlobalProviderProps {
  children: ReactNode;
}

export const initialStoreValue = {
  openConfigurator: false,
  openSideNav: false,
  activeConfigurator: '',
};
