import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import { GET_SESSION } from '@/graphql';
import { Auth, Dashboard } from '@/layouts';
import { Loading } from '@/components/atoms';
import { useSession } from '@/hooks';

function App() {
  const [getSession, { loading }] = useLazyQuery(GET_SESSION);
  const [session, setSession] = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const initFn = async () => {
      const sessionToken = localStorage.getItem('sessionToken');

      if(!loading && sessionToken && !session?.id) {
        getSession({
          onCompleted: ({ session: res }) => {
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
        });
      } else if (!loading && !sessionToken) {
        localStorage.removeItem('sessionToken');
        navigate('auth/signin');
      }
    };
    
    initFn();
  }, [session?.id, loading, setSession, getSession, navigate]);

  if(loading && !session.id) {
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
