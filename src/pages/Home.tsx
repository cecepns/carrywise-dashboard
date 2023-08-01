import { StatisticsCard } from '@/components/organisms';
import { useMemo } from 'react';
import { useGetCarrierListQuery, useGetSenderListQuery } from '@/generated/graphql';

export const Home: React.FC = () => {

  const { data: dataSenders } = useGetSenderListQuery();
  const { data: dataCarriers } = useGetCarrierListQuery();

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
    </div> 
  );
};
