import {
  GlobalProviderProps,
  GlobalStateContextProps,
  initialStoreValue
} from '@/constants';
import { Session } from '@/generated/graphql';
import { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext<GlobalStateContextProps | any>(undefined);

export const GlobalStateProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [valueStore, dispatch] = useState(initialStoreValue);

  return (
    <GlobalStateContext.Provider value={{ valueStore, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useConfigurator = (): [boolean, typeof setter] => {
  const store = useContext(GlobalStateContext);
  const key = 'openConfigurator';

  if (!store) {
    throw Error(`cannot find store with key: ${key}`);
  }

  const objectStore = store.valueStore[key];

  const setter = () => {
    store.dispatch({ ...store.valueStore, [key]: !store.valueStore[key] });
    console.log('INIT CONFIGURATOR');
    console.log(store.valueStore);

  };

  return [objectStore, setter];
};

export const useActiveConfigurator = (): [string, typeof setter] => {
  const store = useContext(GlobalStateContext);
  const key = 'activeConfigurator';

  if (!store) {
    throw Error(`cannot find store with key: ${key}`);
  }

  const objectStore = store.valueStore[key];
  
  const setter = (value: string) => {
    store.dispatch({ ...store.valueStore, openConfigurator: !store.valueStore.openConfigurator, [key]: value });
    console.log('INIT ACTIVE CONFIGURATOR');
    console.log(store.valueStore);
  };

  return [objectStore, setter];
};

export const useSideNav = (): [boolean, typeof setter] => {
  const store = useContext(GlobalStateContext);
  const key = 'openSideNav';

  if (!store) {
    throw Error(`cannot find store with key: ${key}`);
  }

  const objectStore = store.valueStore[key];

  const setter = () => {
    store.dispatch({ ...store.valueStore, [key]: !store.valueStore[key] });
  };

  return [objectStore, setter];
};

export const useSession = (): [Session, typeof setter] => {
  const store = useContext(GlobalStateContext);
  const key = 'session';

  if (!store) {
    throw Error(`cannot find store with key: ${key}`);
  }

  const objectStore = store.valueStore[key];

  const setter = (session:Session) => {
    store.dispatch({ ...store.valueStore, [key]: session });
  };

  return [objectStore, setter];
};
