import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import moment from 'moment';
import { useDeleteTravelBoardMutation, useGetTravelBoardsLazyQuery } from '@/generated/graphql';

export enum AuthEnum {
  Sender = 'sender',
  Carrier = 'carrier',
}

export const TravelBulletin: React.FC = () => {
  const navigate = useNavigate();

  const [getListTrips, { data }] =
    useGetTravelBoardsLazyQuery();

  const [deleteTravelBoard] = useDeleteTravelBoardMutation();

  const dataCarriers = useMemo(() => data?.travelBoards, [data?.travelBoards]);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          minDate: moment().format('YYYY-MM-DD')
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
      Header: 'Name',
      accessor: 'firstname',
    },
    {
      Header: 'Space (m³)',
      accessor: 'fleetVolume',
    },
    {
      Header: 'Departure city',
      accessor: 'pickupAddress.location',
    },
    {
      Header: 'Destination city',
      accessor: 'destinationAddress.location',
    },
    {
      Header: 'Date',
      accessor: 'date',
      Cell: (cell: { date: moment.MomentInput; }) => (
        <span>{moment(cell.date).format('MM-DD-YYYY')}</span>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (cell: any) => (
        <Button variant="danger" onClick={() => handleDelete(cell.id)}>Delete</Button>
      ),
    },
  ], [handleDelete]);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Travel Bulletin
        </Typography>
        <Button className="w-[110px]" onClick={() => navigate('/dashboard/travel-bulletin/add')}>Add</Button>
      </div>
      <Table columns={columnsCarrier} data={dataCarriers}/>
    </div> 
  );
};
