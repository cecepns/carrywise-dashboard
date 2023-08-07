import { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { Button, Icon, Loading, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import { StripeCharge, useStripeChargetListQuery, useStripeRefundListQuery, useStripeRefundCreateMutation } from '@/generated/graphql';
import { convertEuroAmount } from '@/utils';
import { ApolloError } from '@apollo/client';

export const PaymentCharges: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading } = useStripeChargetListQuery();
  const [refundMutation] = useStripeRefundCreateMutation();
  const { data: dataRefund } = useStripeRefundListQuery({
    variables: {
      filter: {
        limit: 100
      }
    }
  });

  const dataPayments = useMemo(() => {
    if(activeTab === 0) {
      return data?.stripeChargeList ?? [];
    }
    if(activeTab === 1) {
      return dataRefund?.stripeRefundList ?? [];
    }
    return [];
  }, [activeTab, data?.stripeChargeList, dataRefund?.stripeRefundList]);

  const handleRefund = useCallback((chargeId:string) => {
    const promp = confirm('are you sure you want to refund?');
    console.log(promp);

    if(promp) {
      refundMutation({
        variables: {
          input: {
            chargeId
          }
        },
        onCompleted: () => alert('successfully refunded'),
        onError: (err: ApolloError) => alert(err),
      });
    }
  }, [refundMutation]);

  const columnsCharges = useMemo(() => [
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
          <a className="flex items-center bg-blue-700 hover:bg-blue-800 px-2 py-1 rounded-md text-white" href={cell.receipt_url ?? ''} target="_blank">
            <Icon type="solid" name="eye" className="mr-2"/>
            Detail
          </a>
          {!cell.refunded && (
            <Button className="w-[100px] items-center bg-green-700 px-2 py-1 rounded-md text-white hover:bg-green-800"
              onClick={() => handleRefund(cell.id ?? '')}
            >
              <Icon type="solid" name="money-bill"/>
              Refund
            </Button>)}
        </div>
      ),
    },
  ], [handleRefund]);

  const columnsRefund = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Id',
      accessor: 'id',
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
      accessor: 'status'
    },
    {
      Header: 'Date',
      accessor: 'created',
      Cell: (cell: StripeCharge) => (
        <span>{moment(cell.created).format('MM/DD/YYYY')}</span>
      ),
    },
  ], []);

  const renderTable = useCallback(() => {
    if(activeTab === 0) {
      return <Table columns={columnsCharges} data={dataPayments}/>;
    }
    return <Table columns={columnsRefund} data={dataPayments}/>;
  }, [activeTab, columnsCharges, columnsRefund, dataPayments]);

  if(loading) {
    return <Loading/>;
  }

  return (
    <div className="mt-12">
      <div>
        <Typography className="mb-4">
          Data Payment Charge
        </Typography>
        <div className="flex w-[130px] space-x-3">
          <Button variant={activeTab === 0 ? 'primary' : 'text'} onClick={() => setActiveTab(0)}>Charges</Button>
          <Button variant={activeTab === 1 ? 'primary' : 'text'} onClick={() => setActiveTab(1)}>Refund</Button>
        </div>
        {renderTable()}
      </div>

    </div> 
  );
};
