'use client';

import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { SOCKET_EVENTS } from '@/helpers/constants';
import { useDataSocket } from '@/hooks/useDataSocket';
import { IDetail } from '@/models/IDetail';
import { FetchCoinDetail } from '@/usecases/coin-info';
import dynamic from 'next/dynamic';
import { memo, useContext, useEffect } from 'react';

const CoinInformation = dynamic(() => import('../information'), { ssr: false });
const CoinTabInfo = dynamic(() => import('../coinTabInfo/Index'), {
  ssr: false,
});

const MainData = ({ slug }: any) => {
  const { data, setDefaultData } = useDataSocket<IDetail>(
    SOCKET_EVENTS.coinChange,
    {
      price: 'price',
      percent_change_24h: 'price_change_in_24h',
      volume_24h: 'volume24h',
      market_cap: 'marketCap',
      volume_change_24h: 'vol24hChangeIn24h',
    }
  );

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const getData = async () => {
    try {
      const res: any = await FetchCoinDetail({
        coin_key: slug,
      });
      if (res.name) handleBreadcrumb([{ title: res.name }]);
      setDefaultData(res);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <CoinInformation data={data} slug={slug} />
      <CoinTabInfo data={data} slug={slug} />
    </div>
  );
};

export default memo(MainData);
