import { IconCategories, IconCoin, IconGainers } from '@/assets/icons';
import IconFundraising from '@/assets/icons/IconFundraising';
import IconUpcomingIEOIDO from '@/assets/icons/IconUpcomingIEOIDO';
import { cn } from '@/helpers/functions';
import { Badge, Flex } from 'antd';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import animationData from './icons/trending.json';
import './style.scss';

const data = [
  {
    id: 'all_coin',
    icon: <IconCoin />,
    label: 'Coins',
    isActive: false,
  },
  {
    id: 'categories',
    icon: <IconCategories />,
    label: 'Categories',
    isActive: false,
  },
  {
    id: 'gainers',
    icon: <IconGainers />,
    label: 'Gainers & Losers',
    isActive: false,
  },
  {
    id: 'trending',
    icon: <Lottie animationData={animationData} />,
    label: 'Trending',
    isActive: false,
  },
  {
    id: 'fundraising',
    icon: <IconFundraising />,
    label: 'Fundraising',
    isActive: false,
  },
  {
    id: 'upcoming',
    icon: <IconUpcomingIEOIDO />,
    label: 'Upcoming IDO/IEO',
    isActive: false,
  },
];

interface IProps {
  currentTab: string;
}

const HomeTabs = ({ currentTab }: IProps) => {
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('tab', value);

      return params.toString();
    },
    [searchParams]
  );
  // TODO: fix scroll to active item
  return (
    <Flex vertical gap={24} align='center'>
      <div
        className={cn(
          'hide-scroll flex items-center justify-normal',
          'lg:justify-center home-tabs w-full gap-6',
          'lg:gap-9 overflow-x-auto border-b md:border-none'
        )}
      >
        {data.map((tab) => (
          <Link
            href={`${pathname}?${createQueryString(tab.id)}`}
            key={tab.id}
            className={`home-tab flex items-center gap-2 cursor-pointer ${
              tab.id === currentTab ? 'active' : ''
            }`}
          >
            <div className='min-w-[20px]'>{tab.icon}</div>
            <span className='text-lg lg:text-xl whitespace-nowrap'>
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
      <Flex align='center' justify='center' gap={6}>
        {data.map((tab) => (
          <Badge
            status='default'
            classNames={{
              indicator: cn(
                'w-2 h-2',
                tab.id === currentTab &&
                  '!bg-[#5766FF] !w-[22px] !rounded-[12px]'
              ),
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default HomeTabs;
