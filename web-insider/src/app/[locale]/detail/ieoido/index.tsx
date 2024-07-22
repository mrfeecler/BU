'use client';
import { FetchCoinIDOIEO } from '@/usecases/coin-info';
import { useEffect, useRef, useState } from 'react';
import Detail from './detail/Detail';
import Overview from './overview/Overview';

const IEOIDODetail = ({ data, slug }: any) => {
  const refDetail = useRef<HTMLElement>(null);

  const [dataFetch, setDataFetch] = useState<any>();

  const handleData = async () => {
    const fetchData: any = await FetchCoinIDOIEO({ coin_key: slug, limit: 10 });
    setDataFetch(fetchData);
  };

  const handleScroll = () => {
    refDetail.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className='fade-top py-3'>
      <Overview
        tokenInfo={data}
        overView={dataFetch?.overview}
        ieoidos={dataFetch?.ieoidos}
        handleScroll={handleScroll}
      />
      <Detail
        tokenInfo={data}
        ieoidos={dataFetch?.ieoidos}
        refDetail={refDetail}
      />
    </div>
  );
};

export default IEOIDODetail;
