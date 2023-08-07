import { useMemo } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { Icon, Loading, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { StripeCharge, useStripeChargetListQuery } from '@/generated/graphql';
import { convertEuroAmount } from '@/utils';

export const PaymentCharges: React.FC = () => {
  const { data, loading } = useStripeChargetListQuery();

  const dataPayments = useMemo(() => data?.stripeChargeList ?? [], [data?.stripeChargeList]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      Cell: (cell: StripeCharge) => (
        <span className="text-bold">€{convertEuroAmount(cell?.amount ?? 0)}</span>
      ),
    },
    {
      Header: 'Status',
      accessor: 'status',
      Cell: (cell: StripeCharge) => {
        const wrapperClass = classNames('p-1 text-white rounded-md', {
          'bg-red-600': cell.refunded,
          'bg-green-600': !cell.refunded,
        });
        
        return <span className={wrapperClass}>{cell.refunded ? 'refunded' : 'succeeded'}</span>;
      },
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
      accessor: 'created',
      Cell: (cell: StripeCharge) => (
        <span>{moment(cell.created).format('MM/DD/YYYY')}</span>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (cell: StripeCharge) => (
        <div className="flex space-x-2">
          <a className="flex items-center bg-blue-700 px-2 py-1 rounded-md text-white" href={cell.receipt_url ?? ''} target="_blank">
            <Icon type="solid" name="eye" className="mr-2"/>
            Detail
          </a>
          {!cell.refunded && (
            <a className="flex items-center bg-green-700 px-2 py-1 rounded-md text-white" href={cell.receipt_url ?? ''} target="_blank">
              <Icon type="solid" name="money-bill" className="mr-2"/>
              Refund
            </a>)}
        </div>
      ),
    },
  ], []);

  console.log(dataPayments);
  if(loading) {
    return <Loading/>;
  }

  return (
    <div className="mt-12">
      <div>
        <Typography>
          Data Payment Charge
        </Typography>
        <Table columns={columnsCarrier} data={dataPayments}/>
      </div>

    </div> 
  );
};
