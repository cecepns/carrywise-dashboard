import { AuthEnum, GenderEnum, Session } from '@/generated/graphql';
import { ReactNode } from 'react';

export interface GlobalState {
  openConfigurator: boolean;
  openSideNav: boolean;
  activeConfigurator: string;
  session: Session;
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
  
  session: {
    id: undefined,
    authType: AuthEnum.Sender,
    email: '',
    firstname: '',
    lastname: '',
    gender: GenderEnum.Other,
    phone: '',
    country: '',
    referenceCode: '',
    url: {
      image: null,
      idCard: null,
      transportLicense: null,
    },
    // user only
    birthdate: '',
    address: null,
    // carrier only
    company: {
      name: '',
      address: null,
    },
    fleetType: '',
    vat: '',
  },
};
