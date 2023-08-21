import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { useMemo } from 'react';
import { useGetSenderListQuery } from '@/generated/graphql';

export const Sender: React.FC = () => {
  const { data } = useGetSenderListQuery();

  const dataSenders = useMemo(() => data?.senderList, [data]);

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
      Header: 'Address',
      accessor: 'address.location',
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
          Data Senders
        </Typography>
        <Table isConvertExcel columns={columnsCarrier} data={dataSenders}/>
      </div>

    </div> 
  );
};
