import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { GET_SESSION } from '@/graphql';
import { Auth, Dashboard } from '@/layouts';
import { Loading } from '@/components/atoms';
import { useSession } from '@/hooks';

function App() {
  const [getSession, { loading }] = useLazyQuery(GET_SESSION);
  const [, setSession] = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const initFn = async () => {
      const sessionToken = localStorage.getItem('sessionToken');

      if(sessionToken) {
        getSession({
          onCompleted: ({session: res}) => {
            if(res.id) {
              console.log(res);
              navigate('dashboard/home');
              setSession(res);
            } else {
              navigate('auth/signin');
            }
          },
          onError: ()=> {
            navigate('auth/signin');
          }
        })
      } else if (!sessionToken) {
        navigate('auth/signin');
        localStorage.removeItem('sessionToken');
      };
    };
    
    initFn();
  },[]);

  if(loading) {
    return <Loading />
  };
  
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/auth/signin" replace />} />
    </Routes>
  );
}

export default App;
