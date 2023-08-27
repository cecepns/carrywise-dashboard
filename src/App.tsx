import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Auth, Dashboard } from '@/layouts';
import { Loading } from '@/components/atoms';
import { useSession } from '@/hooks';
import { useSessionLazyQuery } from '@/generated/graphql';

function App() {
  const [isInit, setIsInit] = useState<boolean>(false);
  const [getSession, { loading }] = useSessionLazyQuery();
  const [session, setSession] = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const initFn = async () => {
      const sessionToken = localStorage.getItem('sessionToken');

      if(!loading && sessionToken && !session?.id) {
        getSession({
          fetchPolicy: 'network-only',
          onCompleted: ({ session: res }) => {
            if(res?.id && res.isAdmin) {
              console.log(res);
              navigate('dashboard/home');
              setSession(res);
            } else {
              navigate('auth/signin');
              localStorage.removeItem('sessionToken');
            }
          },
          onError: ()=> {
            navigate('auth/signin');
          }
        });
      } else if (!loading && !sessionToken) {
        localStorage.removeItem('sessionToken');
        navigate('auth/signin');
      }
    };
    if (!isInit) {
      setIsInit(true);
      initFn();
    }
  }, [session?.id, loading, setSession, getSession, navigate, isInit]);

  if(loading) {
    return <Loading />;
  }
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/signin" replace />} />
    </Routes>
  );
}

export default App;
