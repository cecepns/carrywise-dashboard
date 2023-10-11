import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { useMemo } from 'react';
import { useGetCarrierListQuery } from '@/generated/graphql';

export const Carrier: React.FC = () => {
  const { data } = useGetCarrierListQuery();

  const dataCarriers = useMemo(() => data?.carrierList, [data]);

  console.log(dataCarriers);

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
          Data Carriers
        </Typography>
        <Table isConvertExcel columns={columnsCarrier} data={dataCarriers}/>
      </div>

    </div> 
  );
};
