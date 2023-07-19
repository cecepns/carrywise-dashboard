import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { useMemo } from 'react';
import { GET_CARRIERLIST } from '@/graphql';
import { useQuery } from '@apollo/client';

export const Carrier: React.FC = () => {
  const { data } = useQuery(GET_CARRIERLIST);

  const dataCarriers = useMemo(() => data?.carrierList, [data]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Name',
      accessor: 'firstname',
    },
    {
      Header: 'Email',
      accessor: 'email',
    },
    {
      Header: 'Country',
      accessor: 'country',
    },
    {
      Header: 'Fleet Type',
      accessor: 'fleetType',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
  ], []);

  return (
    <div className="mt-12">
      <div>
        <Typography>
          Data Sender
        </Typography>
        <Table columns={columnsCarrier} data={dataCarriers}/>
      </div>

    </div> 
  );
};
