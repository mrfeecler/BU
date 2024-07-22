'use client';

import { cn } from '@/helpers/functions';
import { FetchUnlockToken } from '@/usecases/coin-info';
import { Segmented } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { memo, useEffect, useRef, useState } from 'react';
import Chart from './Chart/index';
import Past from './Past';
import Rounds from './Rounds/Rounds';
import Upcomming from './Upcomming/Upcomming';

const Schedule = ({ slug, tokenInfo }: any) => {
  const [data, setData] = useState<AnyObject>({
    round: null,
    upcoming: null,
    ended: null,
    chart: null,
  });
  const refUnlockSchedule = useRef<HTMLDivElement>(null);

  const [unlock, setUnlock] = useState('round');

  const handler = (e: any) => {
    setUnlock(e);
    setTimeout(
      () =>
        refUnlockSchedule.current?.scrollIntoView({
          behavior: 'smooth',
        }),
      1000
    );
  };

  const renderUnlock = () => {
    switch (unlock) {
      case 'round':
        return <Rounds data={data.round} tokenInfo={tokenInfo} />;
      case 'upcoming':
        return <Upcomming data={data.upcoming} tokenInfo={tokenInfo} />;
      case 'ended':
        return <Past data={data.ended} tokenInfo={tokenInfo} />;
      case 'chart':
        return <Chart data={data} tokenInfo={tokenInfo} />;
      default:
        break;
    }
  };

  const fetchUnlock = async () => {
    if (data[unlock]) return;
    let res = await FetchUnlockToken({
      coin_key: slug,
      status: unlock,
    });
    setData((prev) => ({
      ...prev,
      [unlock]: res,
    }));
  };

  useEffect(() => {
    fetchUnlock();
  }, [unlock]);
  return (
    <div ref={refUnlockSchedule} className='box-shadow-common p-6'>
      <div className='flex items-center justify-between mb-6'>
        <div className='text-xl text-grey-700 font-bold font-jb'>
          Unlock Schedule
        </div>
        <div>
          <Segmented
            options={[
              {
                value: 'round',
                label: 'Rounds',
              },
              {
                value: 'upcoming',
                label: 'Upcoming',
              },
              {
                value: 'ended',
                label: 'Past',
              },
              {
                value: 'chart',
                label: 'Chart',
              },
            ]}
            value={unlock}
            onChange={(e) => handler(e)}
            className={cn(
              '[&_.ant-segmented-item-selected>div]:!text-[#5766FF]',
              '[&_.ant-segmented-item-selected>div]:!font-jsb'
            )}
          />
        </div>
      </div>
      <div className='mb-6'>{renderUnlock()}</div>
    </div>
  );
};

export default memo(Schedule);
