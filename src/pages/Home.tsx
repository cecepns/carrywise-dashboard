import { StatisticsCard } from '@/components/organisms';
import { useMemo } from 'react';
import { GET_CARRIERLIST, GET_SENDERLIST } from '@/graphql';
import { useQuery } from '@apollo/client';

export const Home: React.FC = () => {

  const { data: dataSenders } = useQuery(GET_SENDERLIST);
  const { data: dataCarriers } = useQuery(GET_CARRIERLIST);

  const counterSenders = useMemo(() => dataSenders?.senderList?.length ?? 0, [dataSenders]);
  const counterCarriers = useMemo(() => dataCarriers?.carrierList?.length ?? 0, [dataCarriers]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        <StatisticsCard
          title="Total Carriers"
          icon="user"
          value={counterSenders}
          color="green"
        />
        <StatisticsCard
          title="Total Senders"
          icon="user"
          value={counterCarriers}
          color="blue"
        />
      </div>
    </div> 
  );
};
