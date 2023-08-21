import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';

export const TravelBulletin: React.FC = () => {
  const navigate = useNavigate();

  const dataCarriers = useMemo(() => [], []);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Departure city',
      accessor: 'departure',
    },
    {
      Header: 'Destination city',
      accessor: 'destination',
    },
  ], []);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Travel Bulletin
        </Typography>
        <Button className="w-[110px]" onClick={() => navigate('/dashboard/travel-bulletin/add')}>Add</Button>
      </div>
      <Table columns={columnsCarrier} data={dataCarriers}/>
    </div> 
  );
};
