import { useMemo } from 'react';
import moment from 'moment';

import { Icon, Typography } from '@/components/atoms';
import { RouteTimeline, Table } from '@/components/molecules';
import { Transaction, useMyTransactionsQuery } from '@/generated/graphql';
import { Timeline } from '@/type';

export const Trips: React.FC = () => {
  const { data } = useMyTransactionsQuery({
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        isDeal: true,
        isOwned: true,
        minDate: new Date().toDateString(),
      },
    },
  });

  const dataTransactions = useMemo(() => data?.transactions ?? [], [data?.transactions]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Sender',
      accessor: 'sender.firstname',
      Cell: (cell: Transaction) => (
        <div className="space-y-2">
          <Typography>
            {cell.sender?.firstname} {cell.sender?.lastname}
          </Typography>
          <div className="flex items-center space-x-2">
            <Icon type="solid" size="1x" name="phone" className="mr-1" /> : <span>{cell.sender?.phone}</span>
          </div>
        </div>
      ),
    },
    {
      Header: 'Carrier',
      accessor: 'carrier.firstname',
      Cell: (cell: Transaction) => (
        <div className="space-y-2">
          <Typography>
            {cell.carrier?.firstname} {cell.carrier?.lastname}
          </Typography>
          <div className="flex items-center space-x-2">
            <Icon type="solid" size="1x" name="phone" className="mr-1" /> : <span>{cell.carrier?.phone}</span>
          </div>
        </div>
      ),
    },
    {
      Header: 'Delivery',
      accessor: 'delivery',
      Cell: (cell: Timeline) => (
        <div>
          <RouteTimeline data={cell} onPress />
        </div>
      ),
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (cell: Transaction) => (
        <span>{moment(cell.date).format('MM/DD/YYYY')}</span>
      ),
    },
  ], []);

  return (
    <div className="mt-12">
      <div>
        <Typography>
          Data Trips
        </Typography>
        <Table columns={columnsCarrier} data={dataTransactions}/>
      </div>

    </div> 
  );
};
