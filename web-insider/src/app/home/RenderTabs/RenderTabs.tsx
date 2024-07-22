'use client';

import { Flex } from 'antd';
import { useSearchParams } from 'next/navigation';
import Categories from '../categories';
import Coins from '../coin';
import Fundraising from '../fundraising';
import Gainers from '../gainers';
import HomeTabs from '../tabs';
import Trending from '../trending';
import UpComing from '../up-coming';

const RenderTabs = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') ?? 'all_coin';

  const renderTableContent = () => {
    switch (tab) {
      case 'categories':
        return <Categories />;
      case 'gainers':
        return <Gainers />;
      case 'trending':
        return <Trending />;
      case 'fundraising':
        return <Fundraising />;
      case 'upcoming':
        return <UpComing />;
      case 'all_coin':
      default:
        return <Coins />;
    }
  };

  return (
    <Flex vertical gap={24}>
      <HomeTabs currentTab={tab} />
      <div className='md:border md:rounded-lg'>{renderTableContent()}</div>
    </Flex>
  );
};

export default RenderTabs;
