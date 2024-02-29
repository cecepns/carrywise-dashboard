import { useCallback, useEffect, useState, useMemo } from 'react';
import { Button, Typography } from '@/components/atoms';
import { Input } from '@/components/molecules';
import { useGetCarrierListQuery } from '@/generated/graphql';

interface CreateSessionRes {
  data: { qr: string };
}

export const WhatsApp = () => {
  const { data } = useGetCarrierListQuery();

  const dataCarriers = useMemo(() => data?.carrierList, [data]);

  const [loading, setLoading] = useState(false);
  const [loadingSendMessage, setLoadingSendMessage] = useState(false);
  const [sessions, setSessions] = useState<string[]>([]);
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

  const createSession = useCallback(async () => {
    try {
      setLoading(true);
      if (sessions.length > 0) {
        setLoading(false);
        return alert('Can\'t create session more than 1, please delete session');
      }
      const raw = await fetch(`${import.meta.env.VITE_ENDPOINT_API}/start-session?session=${sessionName}`, {
        mode: 'no-cors'
      });
      const res: CreateSessionRes = await raw.json();

      setLoading(false);
      setQrCode(res?.data?.qr);
      setSessions([sessionName]);
      alert('Success create session');

      setTimeout(() => {
        setQrCode('');
      }, 30000);
    } catch (error) {
      setLoading(false);
      alert('Failed create session');
    }
  }, [sessionName, sessions.length]);

  const deleteSession = useCallback(async (v:string) => {

    try {
      const raw = await fetch(`${import.meta.env.VITE_ENDPOINT_API}/delete-session?session=${v}`, {
        mode: 'no-cors'
      });
      const res = await raw.json();

      if(res) {
        setSessions([]);
        alert('Success delete session');
      }
  
    } catch (error) {
      alert('Failed delete session');
    }
   
  }, []);

  const sendMessage = useCallback(async () => {
    try {
      setLoadingSendMessage(true);
      const raw = await fetch(`${import.meta.env.VITE_ENDPOINT_API}/send-message`, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          session: sessions[0],
          to: form.phone?.replace('+', ''),
          text: form.message
        })
      });
      const res = await raw.json();

      if(res) {
        setLoadingSendMessage(false);
        alert('Success send message');
      }

    } catch (error) {
      setLoadingSendMessage(false);
      setLoading(false);
      alert('Failed send message');
    }
  }, [form.message, form.phone, sessions]);

  useEffect(() => {
    const fn = async () => {

      try {
        const raw = await fetch(`${import.meta.env.VITE_ENDPOINT_API}/sessions?key=carrywiseadmin`, {
          mode: 'no-cors'
        });
        const res = await raw.json();

        setSessions(res?.data);
  
        console.log(res);
      } catch (error) {
        console.log('err', error);        
      }

    };

    fn();
  }, []);

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
                {sessions.map((v, idx) => (
                  <div key={idx.toString()} className="flex items-center space-x-3">
                    <Typography className="bg-green-600 mb-0 text-white rounded px-2 w-fit mb-2" key={idx.toString()}>{idx + 1} - {v}</Typography>
                    <Button size="sm" variant="danger" onClick={() => deleteSession(v)}> delete </Button>
                  </div>
                ))}
              </div>
            ) : <Typography className="text-red-700 mt-5">No Sessions Active</Typography>}
          </div>
          <div className="bg-clip-border rounded-xl bg-white shadow-md p-5">
            <Input label="Session name" onChange={v => setSessionName(v)}/>
            <Button className="my-3" disabled={loading || sessionName.length < 2} onClick={createSession}>
              {loading ? 'Loading...' : 'Create new sessions'}
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
            {(dataCarriers || []).map((v:any, idx) => (
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
