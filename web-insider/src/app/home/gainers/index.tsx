import { ORDER, SOCKET_EVENTS } from '@/helpers/constants';
import { caculatorAverage24h } from '@/helpers/functions';
import { useDataSocket } from '@/hooks/useDataSocket';
import { FetchGainers, FetchLosers } from '@/usecases/home';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import GainersHeader from './gainers-header';
import { IGainer } from './props';
import './style.scss';
import TopData from './top-data';

const tabs = [
  {
    id: 1,
    label: 'Top Gainers',
  },
  {
    id: 2,
    label: 'Top Losers',
  },
];

const Gainers = () => {
  const { data: gainers, setDefaultData: setDefaultGainers } = useDataSocket<
    IGainer[]
  >(SOCKET_EVENTS.coinChange, {
    price: 'price',
    percent_change_24h: 'priceChangeIn24',
    volume_24h: 'volume24h',
  });

  const { data: losers, setDefaultData: setDefaultLosers } = useDataSocket<
    IGainer[]
  >(SOCKET_EVENTS.coinChange, {
    price: 'price',
    percent_change_24h: 'priceChangeIn24',
    volume_24h: 'volume24h',
  });

  const [filterCoin, setFilterCoin] = useState('all');
  const [filterTime, setTime] = useState('24h');
  const [orderGainer, setOrderGainer] = useState({
    columnKey: '',
    order: '',
  });

  const [orderLoser, setOrderLoser] = useState({
    columnKey: '',
    order: '',
  });

  function getGainers() {
    FetchGainers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderGainer.columnKey,
      sort_order: ORDER[orderGainer['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      res.data.sort(
        (a: { priceChangeIn24: number }, b: { priceChangeIn24: number }) =>
          b.priceChangeIn24 - a.priceChangeIn24
      );
      setDefaultGainers(res.data);
    });
  }

  function getLosers() {
    FetchLosers({
      time: filterTime,
      coin: filterCoin,
      sort_by: orderLoser.columnKey,
      sort_order: ORDER[orderLoser['order'] as keyof typeof ORDER],
    }).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      res.data.sort(
        (a: { priceChangeIn24: number }, b: { priceChangeIn24: number }) =>
          a.priceChangeIn24 - b.priceChangeIn24
      );
      setDefaultLosers(res.data);
    });
  }

  useEffect(() => {
    getGainers();
    getLosers();
  }, [filterTime, filterCoin, orderGainer]);

  const renderTopData = (id: number, isMobile?: boolean) => {
    if (id === 1) {
      return (
        <TopData
          title={isMobile ? '' : 'Top Gainers'}
          data={gainers || []}
          onChangeOrder={() => {}}
        />
      );
    }
    if (id === 2) {
      return (
        <TopData
          title={isMobile ? '' : 'Top Losers'}
          data={losers || []}
          onChangeOrder={setOrderLoser}
        />
      );
    }
  };

  return (
    <div className='hide-scroll'>
      <div className={'md:p-6'}>
        <GainersHeader onFilterCoins={setFilterCoin} onFilterTime={setTime} />
        <div className='flex-col xl:flex-row gap-10 lg:gap-20 hidden md:flex'>
          {tabs.map((tab) => renderTopData(tab.id, false))}
        </div>
        <div className={'block md:hidden gains-mobile'}>
          <Tabs
            centered
            size={'large'}
            items={tabs.map((tab) => {
              return {
                label: tab.label,
                key: tab.label,
                children: renderTopData(tab.id),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Gainers;
