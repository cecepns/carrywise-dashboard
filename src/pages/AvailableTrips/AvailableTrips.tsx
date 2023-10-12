import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import moment from 'moment';
import { Transaction, useDeleteTravelBoardMutation, useGetTravelBoardsLazyQuery } from '@/generated/graphql';
import { AuthEnum } from '@/type';

export const AvailableTrips: React.FC = () => {
  const navigate = useNavigate();

  const [getListTrips, { data }] =
    useGetTravelBoardsLazyQuery();

  const [deleteTravelBoard] = useDeleteTravelBoardMutation();

  const dataCarriers = useMemo(() => data?.transactions, [data?.transactions]);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          initBy: AuthEnum.Carrier,
        }
      }
    });
  }, [getListTrips]);

  const handleDelete = useCallback((id: number) => {
    const confirm = window.confirm('Are you sure want to delete this data ?');

    if(confirm) {
      deleteTravelBoard({
        fetchPolicy: 'network-only',
        variables: {
          input: {
            transactionId: id.toString()
          },
        },
        onCompleted: ({ deleteTravelBoard: res }) => {
          if(res?.status === 'success') {
            getListTrips({
              fetchPolicy: 'cache-and-network',
              variables: {
                filter: {
                  initBy: AuthEnum.Carrier,
                }
              }
            });
          }
        },
        onError: e => {
          console.log(e);
          alert(e);
        },
      });
    }

  }, [deleteTravelBoard, getListTrips]);

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
      Header: 'Carrier Name',
      accessor: 'firstname',
      Cell: (cell: Transaction) => (
        <span>{cell.firstname || cell.carrier?.firstname}</span>
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
      Header: 'Space (m³)',
      accessor: 'fleetVolume',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (cell: Transaction) => (
        <div className="flex space-x-3">
          <Button variant="success">Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(cell.id)}>Delete</Button>
        </div>
      ),
    },
  ], [handleDelete]);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Available Trips
        </Typography>
        <Button className="w-[110px]" onClick={() => navigate('/dashboard/available-trips/add')}>Add</Button>
      </div>
      <Table columns={columnsCarrier} data={dataCarriers}/>
    </div> 
  );
};
