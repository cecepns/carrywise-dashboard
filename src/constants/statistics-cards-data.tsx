import { Icon } from '@/components/atoms';
import { Color } from '@/components/organisms';

export interface Footer {
  color: string;
  value: string;
  label: string;
}

export interface StatisticsCardDataProps {
  color: Color;
  icon: React.ReactNode;
  title: string;
  value: string;
  footer?: Footer;
}

export const statisticsCardsData: StatisticsCardDataProps[] = [
  {
    color: 'blue',
    icon: <Icon type="solid" name="house" className="text-white"/>,
    title: 'Sender',
    value: '1755',
    footer: {
      color: 'text-green-500',
      value: '+55',
      label: 'than last week',
    },
  },
  {
    color: 'green',
    icon: <Icon type="solid" name="user" className="text-white"/>,
    title: 'Carrier',
    value: '2,300',
    footer: {
      color: 'text-green-500',
      value: '+3',
      label: 'than last week',
    },
  },
];

export default statisticsCardsData;
