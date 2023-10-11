import { useCallback, useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Modal, Table } from '@/components/molecules';
import moment from 'moment';
import { Transaction, useMyTransactionsLazyQuery, useStripeChargetListLazyQuery } from '@/generated/graphql';
import { AuthEnum } from '@/type';

export const Payments: React.FC = () => {
  const [modal, showModal] = useState<boolean>(false);
  const [detailTransaction, setDetailTransaction] = useState<Transaction>({});
  const [getListTrips, { data }] =
    useMyTransactionsLazyQuery();

  const [getListStatusPayment, { loading: loadingPayment }] = useStripeChargetListLazyQuery();

  const dataTransactions = useMemo(() => data?.transactions, [data?.transactions]);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          // minDate: moment().format('YYYY-MM-DD'),
          initBy: AuthEnum.Sender,
          isDeal: true,
        }
      }
    });
  }, [getListTrips]);

  const handleShowDetail = useCallback((value: Transaction) => {
    showModal(true);
    setDetailTransaction(value);
  }, []);

  const showDetailPayment = useCallback((paymentId:string) => {
    if(paymentId) {
      getListStatusPayment({
        fetchPolicy: 'cache-and-network',
        variables: {
          filter: {
            paymentId
          }
        },
        onCompleted: ({ stripeChargeList: res }) => {
          console.log(res);
          if (res && res[0]?.receipt_url) {
            window.open(res[0].receipt_url);
          }
        }
      });
    }
  }, [getListStatusPayment]);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (cell: { date: moment.MomentInput; }) => (
        <span>{moment(cell.date).format('MM-DD-YYYY')}</span>
      ),
    },
    {
      Header: 'Code',
      accessor: 'code',
    },
    {
      Header: 'Sender Name',
      accessor: 'firstname',
      Cell: (cell: Transaction) => (
        <span>{cell.firstname || cell.sender?.firstname}</span>
      ),
    },
    {
      Header: 'Carrier Name',
      accessor: 'firstname',
      Cell: (cell: Transaction) => (
        <span>{cell.firstname || cell.carrier?.firstname || '-'}</span>
      ),
    },
    {
      Header: 'Departure',
      accessor: 'pickupAddress.location',
    },
    {
      Header: 'Destination',
      accessor: 'destinationAddress.location',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (cell: Transaction) => (
        <div className="flex space-x-3">
          <Button variant="success" onClick={() => handleShowDetail(cell)}>Detail</Button>
          {/* <Button variant="danger">Delete</Button> */}
        </div>
      ),
    },
  ], [handleShowDetail]);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Travel Bulletin
        </Typography>
      </div>
      <Table columns={columnsCarrier} data={dataTransactions}/>
      <Modal isOpen={modal} onClose={() => showModal(false)}>
        <div className="space-y-3">
          <div>Promo Code : {detailTransaction.promo?.code ?? '-'}</div>
          <div>Carrier Fee : €{detailTransaction.carrierFee ?? '-'}</div>
          <div>Platform Fee : €{Number(detailTransaction.platformOriginFee) ?? '-'}</div>
          <div>Total : {detailTransaction.total ?? '-'}€</div>
          {detailTransaction.paymentId && (
            <Button
              variant="success"
              disabled={loadingPayment}
              onClick={() => showDetailPayment(detailTransaction.paymentId ?? '')}
            >
              {loadingPayment ? 'Loading...' : 'Show status'}
            </Button>
          )}
        </div>
      </Modal>
    </div> 
  );
};
