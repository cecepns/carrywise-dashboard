import { useMemo } from 'react';
import moment from 'moment';

import { Transaction, useGetQuotationsQuery } from '@/generated/graphql';
import { Icon, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';

export const Quotations: React.FC = () => {
  const { data } = useGetQuotationsQuery({
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        isDeal: false,
        // minDate: new Date().toDateString(),
      },
    },
  });

  const dataTransactions = useMemo(() => data?.quotations ?? [], [data?.quotations]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (cell: Transaction) => (
        <span>{moment(cell.date).format('MM-DD-YYYY')}</span>
      ),
    },
    {
      Header: 'Offer Date',
      accessor: 'offerDate',
      Cell: (cell: Transaction) => (
        <span>{moment(cell.offerDate).format('MM-DD-YYYY')}</span>
      ),
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Sender',
      accessor: 'sender.firstname',
      Cell: (cell: Transaction) => (
        <div className="space-y-2">
          <Typography>
            {cell.sender?.firstname} {cell.sender?.lastname}
          </Typography>
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
      Header: 'Offer',
      accessor: 'carrier.firstname',
      Cell: (cell: Transaction) => (
        <div className="bg-green-500 font-bold rounded-md text-center py-2 text-white">
            €{cell?.carrierFee ?? 0}
        </div>
      ),
    },
  ], []);

  return (
    <div className="mt-12">
      <div>
        <Typography>
          Quotations
        </Typography>
        <Table columns={columnsCarrier} data={dataTransactions}/>
      </div>

    </div> 
  );
};
