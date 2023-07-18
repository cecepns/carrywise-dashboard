import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { StatisticsCard } from '@/components/organisms';
import { useEffect, useMemo, useState } from 'react';

export const Home: React.FC = () => {
  const [counter, setCounter] = useState({
    counterCarrier: 0,
    counterSender: 0,
  })
  const [carriers, setCarriers] = useState([]);
  const [senders, setSenders] = useState([]);

  useEffect(() => {
    function getCarrierSenderList(isSender:boolean) {
      fetch('http://13.42.19.157/graphql', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiI2NDYzNGZlOWM3OWYzZjEzM2YyZTFlZTIiLCJzZXNzaW9uVHlwZSI6InNlbmRlciIsImlhdCI6MTY4OTY4NTMxNCwiZXhwIjoxNjg5NzcxNzE0fQ.CSBbBcNq3ivqjmI5c_BhvpfvakdFNLN9QNG6fFdXJ00"
          },
          body: JSON.stringify({
              query: `
                  query {
                      ${isSender ? 'senderList' : 'carrierList'} {
                          email
                          country
                          phone
                      }
                  }
              `,
          }),
      })
      .then(res => res.json())
      .then(result => {
        
        const data = result?.data[`${isSender ? 'senderList' : 'carrierList'}`] ?? []; 

        if(isSender) {
          setSenders(data);
          setCounter(prev => ({...prev, counterSender: data.length}))
        } else {
          setCarriers(data);
          setCounter(prev => ({...prev, counterCarrier: data.length}))
        }
      })
      .catch(err => console.log('err :', err))
    }

    getCarrierSenderList(true)
    getCarrierSenderList(false)
  },[])

  const columnsCarrier = useMemo(() => [
    'no',
    'Email',
    'Country',
    'Phone'
  ], [])
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Carrier"
          icon="user"
          value={counter.counterCarrier}
          color="green"
        />
        <StatisticsCard
          title="Total Sender"
          icon="user"
          value={counter.counterSender}
          color="blue"
        />
      </div>
      <div className="mb-4">
        <Typography>
          Data Carrier
        </Typography>
        <Table columns={columnsCarrier} data={carriers}/>
      </div>
      <div>
        <Typography>
          Data Sender
        </Typography>
        <Table columns={columnsCarrier} data={senders}/>
      </div>

    </div> 
  );
};
