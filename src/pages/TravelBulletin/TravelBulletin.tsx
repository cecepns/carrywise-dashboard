import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import moment from 'moment';
import { useGetCarrierAvailableLoadsLazyQuery } from '@/generated/graphql';

export enum AuthEnum {
  Sender = 'sender',
  Carrier = 'carrier',
}

export const TravelBulletin: React.FC = () => {
  const navigate = useNavigate();

  const [getListTrips, { data }] =
    useGetCarrierAvailableLoadsLazyQuery();

  const dataCarriers = useMemo(() => data?.transactions, [data?.transactions]);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          initBy: AuthEnum.Carrier,
          // minDate: moment().add(1, 'day').toISOString(),
        },
      },
    });
  }, [getListTrips]);

  console.log(dataCarriers);

  const columnsCarrier = useMemo(() => [
    {
      Header: 'No',
      accessor: 'no',
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
  ], []);

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
