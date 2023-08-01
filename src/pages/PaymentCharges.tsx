import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { useMemo } from 'react';
import { useStripeChargetListQuery } from '@/generated/graphql';

export const PaymentCharges: React.FC = () => {
  const { data } = useStripeChargetListQuery();

  const dataCarriers = useMemo(() => data?.stripeChargeList ?? [], [data?.stripeChargeList]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: ({ cell }) => (
        <span className="text-bold">€{(cell.amount / 100).toFixed(2)}</span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: ({ cell }) => (
        <span className="p-1 text-white bg-green-600 rounded-md">{cell.status}</span>
      ),
    },
    {
      Header: 'Email',
      accessor: 'billing_details.email',
    },
    {
      Header: 'Country',
      accessor: 'billing_details.address.country',
    },
    {
      Header: 'City',
      accessor: 'billing_details.address.city',
    },
    {
      Header: 'Date',
      accessor: 'date',
    },
  ], []);

  return (
    <div className="mt-12">
      <div>
        <Typography>
          Data Payment Charge
        </Typography>
        <Table columns={columnsCarrier} data={dataCarriers}/>
      </div>

    </div> 
  );
};
