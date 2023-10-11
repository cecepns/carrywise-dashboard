import { useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';

import { Typography } from '@/components/atoms';
import { Table } from '@/components/molecules';
import moment from 'moment';
import { useGetTravelBoardsLazyQuery } from '@/generated/graphql';
import { AuthEnum } from '@/type';

export const AvailableLoads: React.FC = () => {
  // const navigate = useNavigate();

  const [getListTrips, { data }] =
    useGetTravelBoardsLazyQuery();

  //   const [deleteTravelBoard] = useDeleteTravelBoardMutation();

  const dataCarriers = useMemo(() => data?.transactions, [data?.transactions]);

  useEffect(() => {
    getListTrips({
      fetchPolicy: 'cache-and-network',
      variables: {
        filter: {
          // minDate: moment().format('YYYY-MM-DD'),
          initBy: AuthEnum.Sender,
          isRequested: false,
          isDeal: false,
        }
      }
    });
  }, [getListTrips]);

  //   const handleDelete = useCallback((id: number) => {
  //     const confirm = window.confirm('Are you sure want to delete this data ?');

  //     if(confirm) {
  //       deleteTravelBoard({
  //         fetchPolicy: 'network-only',
  //         variables: {
  //           input: {
  //             transactionId: id.toString()
  //           },
  //         },
  //         onCompleted: ({ deleteTravelBoard: res }) => {
  //           if(res?.status === 'success') {
  //             getListTrips({
  //               fetchPolicy: 'cache-and-network',
  //               variables: {
  //                 filter: {
  //                   minDate: moment().format('YYYY-MM-DD')
  //                 }
  //               }
  //             });
  //           }
  //         },
  //         onError: e => {
  //           console.log(e);
  //           alert(e);
  //         },
  //       });
  //     }

  //   }, [deleteTravelBoard, getListTrips]);

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
      Cell: (cell: any) => (
        <span>{cell.firstname || cell.sender.firstname}</span>
      ),
    },
    {
      Header: 'Carrier Name',
      accessor: 'firstname',
      Cell: (cell: any) => (
        <span>{cell.firstname || cell.carrier.firstname || '-'}</span>
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
    // {
    //   Header: 'Action',
    //   accessor: 'action',
    //   Cell: (cell: any) => (
    //     <div className="flex space-x-3">
    //       <Button variant="success">Edit</Button>
    //       <Button variant="danger">Delete</Button>
    //     </div>
    //   ),
    // },
  ], []);

  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <Typography>
          Available Loads
        </Typography>
        {/* <Button className="w-[110px]" onClick={() => navigate('/dashboard/travel-bulletin/add')}>Add</Button> */}
      </div>
      <Table columns={columnsCarrier} data={dataCarriers}/>
    </div> 
  );
};
