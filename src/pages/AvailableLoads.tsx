import { useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Icon, Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import moment from 'moment';
import { Transaction, useGetTravelBoardsLazyQuery } from '@/generated/graphql';
import { AuthEnum } from '@/type';

export const AvailableLoads: React.FC = () => {
  // const navigate = useNavigate();

  const [getListTrips, { data }] =
    useGetTravelBoardsLazyQuery();

  //   const [deleteTravelBoard] = useDeleteTravelBoardMutation();

  const dataCarriers = useMemo(() => data?.transactions, [data?.transactions]);

  console.log(dataCarriers);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          initBy: AuthEnum.Sender,
          isRequested: false,
          isDeal: false,
        }
      }
    });
  }, [getListTrips]);

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
      Header: 'Sender Name',
      accessor: 'firstname',
      Cell: (cell: Transaction) => (
        <div className="flex flex-col space-y-3">
          <div className="flex">
            <Icon name="user" size="sm" type="solid" className="pr-2" /> <span>{cell.firstname || cell.sender?.firstname || '-'}</span>
          </div>
          <div className="flex">
            <Icon name="phone" size="sm" type="solid" className="pr-2"/> {cell.sender?.phone}
          </div>
        </div>
      ),
    },
    {
      Header: 'Carrier Name',
      accessor: 'firstname',
      Cell: (cell: Transaction) => (
        <div className="flex flex-col space-y-5">
          <div className="flex">
            <Icon name="user" size="sm" type="solid" className="pr-2" /> <span>{cell.firstname || cell.carrier?.firstname || '-'}</span>
          </div>
          <div className="flex">
            <Icon name="phone" type="solid" className="pr-2" size="sm" /> {cell.carrier?.phone}
          </div>
        </div>
      ),
    },
    {
      Header: 'Packages',
      accessor: 'packages',
      Cell: (cell: Transaction) => (
        <div>
          {(cell.packages || []).map((v, idx) => {
            return (<div key={idx}>{idx + 1} - {v?.category}</div>);
          })}
        </div>
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
  ], []);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Available Loads
        </Typography>
      </div>
      <Table columns={columnsCarrier} data={dataCarriers}/>
    </div> 
  );
};
