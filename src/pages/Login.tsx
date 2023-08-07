import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Checkbox, Input } from '@/components/molecules';
import { useSession } from '@/hooks';
import { useSessionLazyQuery, useSignInMutation } from '@/generated/graphql';

const initialFormValues = {
  email: '',
  password: '',
  authType: false,
};

export const Login: React.FC = () => {
  const [form, setForm] = useState(initialFormValues);
  const [signIn, { loading }] = useSignInMutation();
  const navigate = useNavigate();
  const [, setSession] = useSession();
  const [getSession] = useSessionLazyQuery();

  const inputChangeHandler = useCallback(
    (name: string) => (value: string | boolean) => {
      setForm(old => ({ ...old, [name]: value }));
    },
    [],
  );

  const handleLogin = useCallback(() => {
    signIn({
      variables: {
        input: {
          ...form,
          authType: form.authType ? 'sender' : 'carrier'
        }
      },
      onCompleted: async ({ signIn: res }) => {
        console.log(res);
        if(res?.token?.session && res.isAdmin) {
          await localStorage.setItem('sessionToken', res.token.session);
          if (res?.token?.session) {
            getSession({
              onCompleted: ({ session: currentSession }) => {
                if(currentSession?.id && currentSession.isAdmin) {
                  setSession(currentSession);
                  navigate('/dashboard/home');
                } else {
                  navigate('auth/signin');
                }
              },
              onError: ()=> {
                navigate('auth/signin');
              }
            });
          }
        } else {
          alert('You don\'t have access');
        }
      },
      onError: (err) => {
        alert(err);
      }
    });
  }, [form, getSession, navigate, setSession, signIn]);
  
  return (
    <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
      <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-4 grid h-28 place-items-center">
        <h3 className="block antialiased tracking-normal font-sans text-3xl font-semibold leading-snug text-white">
          Carrywise Login
        </h3>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="relative w-[200px] h-11 grid grid-cols-3 items-center justify-center">
          <Typography className="text-center"> Carrier </Typography>
          <Checkbox wrapperClassName="m-auto" label="block email" value={form.authType} onChange={inputChangeHandler('authType')} />
          <Typography className="text-center"> Sender </Typography>
        </div>

        <div className="relative w-full min-w-[200px] h-11">
          <Input label="Email" className="h-11" onChange={inputChangeHandler('email')} />
        </div>
        <div className="relative w-full min-w-[200px] h-11">
          <Input label="Password" type="password" className="h-11" onChange={inputChangeHandler('password')} />
        </div>
        <div className="relative w-full min-w-[200px] h-11">
          <Button className="h-11" disabled={loading} onClick={handleLogin}>
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </div>
    </div>
  );
};
