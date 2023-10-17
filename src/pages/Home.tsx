import { useMemo } from 'react';
import moment from 'moment';

import { StatisticsCard } from '@/components/organisms';
import { AuthEnum, Quotation, Transaction, useGetCarrierListQuery, useGetQuotationsQuery, useGetSenderListQuery, useGetTravelBoardsQuery } from '@/generated/graphql';

export const Home: React.FC = () => {

  const { data: dataSenders } = useGetSenderListQuery();
  const { data: dataCarriers } = useGetCarrierListQuery();

  const { data: dataTrips } = useGetTravelBoardsQuery({
    variables: {
      filter: {
        minDate: moment().format('YYYY-MM-DD'),
        initBy: AuthEnum.Carrier,
      }
    }
  });

  const { data: dataLoads } = useGetTravelBoardsQuery({
    variables: {
      filter: {
        minDate: moment().format('YYYY-MM-DD'),
        initBy: AuthEnum.Sender,
        isRequested: false,
        isDeal: false,
      }
    }
  });

  const { data: dataQuotations } = useGetQuotationsQuery({
    fetchPolicy: 'network-only',
    variables: {
      filter: {
        isDeal: false,
        // minDate: new Date().toDateString(),
      },
    },
  });

  const listTrips = useMemo(() => dataTrips?.transactions, [dataTrips?.transactions]);
  const listLoads = useMemo(() => dataLoads?.transactions, [dataLoads?.transactions]);
  const listQuotations = useMemo(() => dataQuotations?.quotations, [dataQuotations?.quotations]);

  const counterSenders = useMemo(() => dataSenders?.senderList?.length ?? 0, [dataSenders]);
  const counterCarriers = useMemo(() => dataCarriers?.carrierList?.length ?? 0, [dataCarriers]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Carriers"
          icon="user"
          value={counterCarriers}
          color="green"
        />
        <StatisticsCard
          title="Total Senders"
          icon="user"
          value={counterSenders}
          color="blue"
        />
      </div>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2">
        <div className="p-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="font-bold mb-5">Available Trips</div>
          {(listTrips || []).map((data: Transaction | null, idx) => (
            <div key={idx} className="flex space-x-3">
              <div>
                {idx + 1}. 
              </div>
              <div>
                {data?.carrier?.firstname || data?.firstname}
              </div>
              <div>
                | {moment(data?.date).format('MM-DD-YYYY')} |
              </div>
              <div>
                {data?.pickupAddress?.location}  → {data?.destinationAddress?.location}
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="font-bold mb-5">Available Loads</div>
          {(listLoads || []).map((data: Transaction | null, idx) => (
            <div key={idx} className="flex space-x-3 flex-wrap">
              <div>
                {idx + 1}. 
              </div>
              <div>
                {data?.sender?.firstname || data?.firstname}
              </div>
              <div>
                | {moment(data?.date).format('MM-DD-YYYY')} |
              </div>
              <div>
                {data?.pickupAddress?.location}  → {data?.destinationAddress?.location}
              </div>
            </div>
          ))}
        </div>
        <div className="p-5 bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="font-bold mb-5">Quotations</div>
          {(listQuotations || []).map((data: Quotation | null, idx) => (
            <div key={idx} className="flex space-x-3 flex-wrap">
              <div>
                {idx + 1}. 
              </div>
              <div>
                Sender: {data?.sender?.firstname}
              </div>
              <div>
                | {moment(data?.date).format('MM-DD-YYYY')} |
              </div>
              <div>
                | Offer date: {moment(data?.offerDate).format('MM-DD-YYYY')} |
              </div>
              <div>
                Carrier: {data?.carrier?.firstname} |
              </div>
              <div className="bg-green-500 font-bold rounded-md text-center p-1 text-white">
                Offer: €{data?.carrierFee}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> 
  );
};
