'use client';

import { IconGas } from '@/assets/icons/home/header/IconGas';
import { cn } from '@/helpers/functions';
import { FetchHeaderBar } from '@/usecases/common';
import { Flex } from 'antd';
import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Marquee from 'react-fast-marquee';
import MarqueeItem from './MarqueeItem/MarqueeItem';
import './index.scss';
import { IMarquee, IMarqueeItem } from './props';

const MarqueeComponent = () => {
  const [data, setData] = useState<IMarqueeItem[]>();
  const [playMarquee, setPlayMarquee] = useState(true);
  const [visibleTooltip, setVisibleTooltip] = useState(false);
  const [mousePos, setMousePos] = useState<{
    x?: number;
    y?: number;
  }>({});

  const handleVisibleTooltip = (isVisible: boolean) => {
    setVisibleTooltip(isVisible);
    setPlayMarquee(!isVisible);
  };

  useEffect(() => {
    _getHeaderBar();
  }, []);

  const _getHeaderBar = async () => {
    const response: any = await FetchHeaderBar();
    if (!response) return;
    const marqueeData: IMarquee | null = response;
    if (!marqueeData) return;
    setData([
      {
        id: 1,
        coinName: 'Market Cap',
        coinPrice: marqueeData.totalMarketCap,
        percent: marqueeData.totalMarketCapChangePercent,
      },
      {
        id: 2,
        coinName: '24h Vol',
        coinPrice: marqueeData.totalVolume24h,
        percent: marqueeData.totalVolume24hChangePercent,
      },
      {
        id: 3,
        coinName: 'ETH Gas',
        icon: <IconGas />,
        coinPrice: marqueeData.totalMarketCap,
        percent: marqueeData.gas.average.price,
        isGas: true,
        child: marqueeData.gas,
        unit: marqueeData.gas.average.unit,
      },
      {
        id: 4,
        coinName: 'BTC Dominance',
        coinPercent: marqueeData.btcDominance,
        percent: marqueeData.btcDominanceChangePercent,
      },
      {
        id: 5,
        coinName: 'BTC MVRV Ratio',
        ratio: marqueeData.btc_mvrv,
      },
      {
        id: 6,
        coinName: 'BTC Realized Price',
        coinPrice: marqueeData.btc_realized_price,
      },
      {
        id: 7,
        coinName: 'BTC Longs',
        percent: marqueeData.btc_long,
      },
      {
        id: 7,
        coinName: 'BTC Shorts',
        percent: marqueeData.btc_short,
      },
      {
        id: 5,
        coinName: 'Fear & Greed Index',
        percent: (marqueeData?.fear_greed as any).value ?? 0,
        coinPrice: 0,
        valueClassification: (marqueeData?.fear_greed as any)
          .value_classification,
        isFear: true,
      },
    ]);
  };

  const _renderMarquee = useMemo(() => {
    if (!data) return;

    const elements: JSX.Element[] = data.map((item, index) => {
      return (
        <Flex key={index} className='md:!gap-6 !gap-2'>
          <MarqueeItem
            data={item}
            visibleTooltip={visibleTooltip}
            handleVisibleTooltip={handleVisibleTooltip}
          />
          <div className='bg-grey-400 w-[1px] h-5'></div>
          {index === data.length - 1 && <div className='w-0' />}
        </Flex>
      );
    });
    return elements;
  }, [data, visibleTooltip]);

  useLayoutEffect(() => {
    if (visibleTooltip) {
      const container = document.querySelector('#desktop');
      const itemTooltip = container?.querySelectorAll('.gas');
      let xFar: number | null = null;
      let indexFar: number | null = null;
      
      if (!!itemTooltip?.length) {
        itemTooltip.forEach((item, i) => {
          const { x } = item.getBoundingClientRect();
          if (xFar === null || Math.abs(x - mousePos.x!) > xFar) {
            xFar = Math.abs(x - mousePos.x!);
            indexFar = i;
          }
        });
        if (indexFar !== null) {
          const tooltips = document?.querySelectorAll('#gas');
          tooltips?.forEach((item, i) => {
            if (i === indexFar) item?.classList.add('hidden');
            else item?.classList.remove('hidden');
          });
        }
      }
    }
  }, [visibleTooltip]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Marquee
      autoFill
      pauseOnHover
      speed={50}
      delay={3}
      play={playMarquee}
      className={cn(
        '[&_.rfm-initial-child-container]:flex',
        'md:[&_.rfm-initial-child-container]:gap-6',
        '[&_.rfm-initial-child-container]:gap-2',
        '[&_.rfm-marquee]:flex',
        'md:[&_.rfm-marquee]:gap-6',
        '[&_.rfm-marquee]:gap-2'
      )}
    >
      {_renderMarquee}
    </Marquee>
  );
};

export default memo(MarqueeComponent);
