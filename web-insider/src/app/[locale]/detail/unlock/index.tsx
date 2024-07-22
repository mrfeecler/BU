'use client';
import { FetchUnlockToken } from '@/usecases/coin-info';
import { useEffect, useState } from 'react';
import Progress from './progress/Progress';
import Schedule from './schedule/Schedule';

const Unlock = ({ tokenInfo, slug }: any) => {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchUnlock();
  }, []);

  async function fetchUnlock() {
    let data = await FetchUnlockToken({
      coin_key: slug,
      status: 'round',
    });
    setData(data);
  }

  return (
    <div>
      <Progress data={data} tokenInfo={tokenInfo} />
      <Schedule slug={slug} tokenInfo={tokenInfo} />
    </div>
  );
};

export default Unlock;
