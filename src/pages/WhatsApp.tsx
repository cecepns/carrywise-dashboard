import { useCallback, useEffect, useState, useMemo } from 'react';
import { Button, Typography } from '@/components/atoms';
import { Input } from '@/components/molecules';
import {
  useCreateSessionWhatsAppMutation,
  useDeleteSessionWhatsAppMutation,
  useGetCarrierListQuery,
  useGetSessionsWhatsAppLazyQuery,
  useSendMessageWhatsAppMutation
} from '@/generated/graphql';

export const WhatsApp = () => {
  const { data:dataCarriers } = useGetCarrierListQuery();
  const [sendMessageWa, { loading: loadingSendMessage }] = useSendMessageWhatsAppMutation();
  const [getSessionsWa] = useGetSessionsWhatsAppLazyQuery();
  const [deleteSessionWa, { loading: loadingDeleteSessions }] = useDeleteSessionWhatsAppMutation();
  const [createSessionWa, { loading: loadingCreateSession }] = useCreateSessionWhatsAppMutation();

  const dataCarriersList = useMemo(() => dataCarriers?.carrierList, [dataCarriers]);

  const [sessions, setSessions] = useState<any>([]);
  const [sessionName, setSessionName] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [form, setForm] = useState({
    phone: '',
    message: '',
  });

  const inputChangeHandler = useCallback((name:string) => (val:string) => {
    setForm(prev => ({
      ...prev,
      [name]: val
    }));
  }, []);

  const createSession = useCallback(() => {
    try {
      createSessionWa({
        variables: {
          input: {
            sessionName
          }
        },
        onCompleted: ({ createSessionWhatsApp : res }) => {
          setQrCode(res?.qr ?? '');
          setSessions([sessionName]);
          alert('Success create session');

          setTimeout(() => {
            setQrCode('');
          }, 30000);
        },
      });

    } catch (error) {
      alert('Failed create session');
    }
  }, [createSessionWa, sessionName]);

  const deleteSession = useCallback((v:string) => {
    deleteSessionWa({
      variables: {
        input: {
          sessionName: v ?? '',
        },
      },
      onCompleted: ({ deleteSessionWhatsApp : res }) => {
        alert('Success delete sessions');
        setSessions([]);
        console.log(res);
      },
      onError: () => {
        alert('Failed delete sessions');
      }
    },
    );
   
  }, [deleteSessionWa]);

  const sendMessage = useCallback(async () => {
    
    sendMessageWa({
      variables: {
        input: {
          data: [{
            isGroup: false,
            to: form.phone?.replace('+', ''),
            text: form.message
          }],
          sessionId: sessions[0],
        }
      },
      onCompleted: () => {
        alert('Success send Message');
      },
      onError: () => {
        alert('Failed send Message');
      }
    });
  }, [form.message, form.phone, sendMessageWa, sessions]);

  useEffect(() => {
    const fn = async () => {
      getSessionsWa({
        fetchPolicy: 'network-only',
        onCompleted: ({ getSessionsWhatsApp : res }) => {
          setSessions(res?.data);
          console.log(res);
        }
      },
      );
    };

    fn();
  }, [getSessionsWa]);

  return (
    <div className="mt-12">
      <div className="space-y-5"> 
        <div className="grid grid-cols-2 mt-5 gap-4">
          <div className="bg-clip-border rounded-xl bg-white shadow-md p-5">
            <Typography>
              Sessions Active
            </Typography>

            {sessions.length > 0 ? (
              <div>
                {sessions.map((v:any, idx:number) => (
                  <div key={idx.toString()} className="flex items-center space-x-3">
                    <Typography className="bg-green-600 mb-0 text-white rounded px-2 w-fit mb-2" key={idx.toString()}>{idx + 1} - {v}</Typography>
                    <Button size="sm" disabled={loadingDeleteSessions} variant="danger" onClick={() => deleteSession(v)}> {
                      loadingDeleteSessions ? 'Loading....' : 'Delete'
                    } </Button>
                  </div>
                ))}
              </div>
            ) : <Typography className="text-red-700 mt-5">No Sessions Active</Typography>}
          </div>
          <div className="bg-clip-border rounded-xl bg-white shadow-md p-5">
            <Input label="Session name" onChange={v => setSessionName(v)}/>
            <Button className="my-3" disabled={loadingCreateSession || sessionName.length < 2} onClick={createSession}>
              {loadingCreateSession ? 'Loading...' : 'Create new sessions'}
            </Button>

            {qrCode && sessions.length > 0 && (
              <>
                <Typography> Scan qr code </Typography>
                <img src={qrCode} alt="qrCode" />
              </>
            )}
          </div>
        </div>
        <div className="w-1/2 space-y-5 bg-clip-border rounded-xl bg-white shadow-md p-5">
          <Typography>
            Send Message 
          </Typography>
          <select name="carrier" className="border border-gray-700 rounded" onChange={e => inputChangeHandler('phone')(e.target.value)}>
            {(dataCarriersList || []).map((v:any, idx) => (
              <option key={idx.toString()} value={v?.phone}>{v?.firstname}</option>
            ))}
          </select>
          <Input className="w-fit" label="Message" onChange={inputChangeHandler('message')}/>
          <Button className="my-3" disabled={loadingSendMessage || form.message.length < 2} onClick={sendMessage}>
            {loadingSendMessage ? 'Loading...' : 'Send Message'}
          </Button>
        </div>
      </div>

    </div> 
  );
};
