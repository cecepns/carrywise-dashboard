import { Maybe } from 'graphql/jsutils/Maybe';
import { ReactNode } from 'react';

export interface GlobalState {
  openConfigurator: boolean;
  openSideNav: boolean;
  activeConfigurator: string;
  session: SessionState;
}

export enum GenderEnum {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}

export enum AuthEnum {
  Sender = 'sender',
  Carrier = 'carrier',
}

export type Address = {
  __typename?: 'Address';
  coordinate?: Maybe<Array<Maybe<any['Float']>>>;
  duration?: Maybe<any['Float']>;
  location?: Maybe<any['String']>;
};

export interface SessionState {
  authType: AuthEnum;
  id?: number;
  email?: string | null;
  firstname?: string;
  lastname?: string;
  phone?: string;
  country?: string;
  imageUrl?: string;
  idCardUrl?: string;
  vat?: string;
  // user only
  gender?: GenderEnum;
  birthdate?: string;
  address?: Address | null;
  // carirer only
  companyName?: string;
  companyAddress?: Address;
  fleetType?: string;
  transportLicenseUrl?: string;
  referenceCode?: string;
  notificationToken?: string;
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
