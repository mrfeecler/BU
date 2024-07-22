import Text from '@/components/Text';
import { nFormatter, percentFormat } from '@/helpers';
import { TIME_FILTER } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { TopIdoLaunchPadDetail } from '@/usecases/ieo-ido';
import { Divider, Flex, Select } from 'antd';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { LaunchPadInfomationType } from '../../types';
import GraphLine from '../graph-line';

const filterData = [
  {
    label: <Text weight='semiBold'>24h</Text>,
    value: TIME_FILTER['24H'],
  },
  {
    label: <Text weight='semiBold'>7d</Text>,
    value: TIME_FILTER['7D'],
  },
  {
    label: <Text weight='semiBold'>1m</Text>,
    value: TIME_FILTER['1M'],
  },
];

type PropsType = {
  info?: LaunchPadInfomationType;
};

export default function CategoryOverview(props: PropsType) {
  const params = useParams<{ slug: string[] }>();
  const [info, setInfo] = useState<LaunchPadInfomationType>();

  const Info = useMemo(() => {
    if (info) return info;
    return {
      gainers: 0,
      losers: 0,
      marketCap: 0,
      marketCapChange: 0,
      volume: 0,
      volumeChange: 0,
      dataChart: {
        marketCaps: [],
        volumes: [],
      },
    };
  }, [info]);

  const getLaunchPadDetail = useCallback(async (filter: any) => {
    const payload = {
      key: params.slug[0],
      time: filter.time,
    };

    const response: any = await TopIdoLaunchPadDetail(payload);

    if (response) {
      setInfo(response);
    }
  }, []);

  const DataChart = useMemo(() => {
    if (!Info.gainers && !Info.losers) return [];

    return [
      {
        value: (Info.gainers / (Info.losers + Info.gainers)) * 100,
        name: 'Gainers',
      },
      {
        value: (Info.losers / (Info.losers + Info.gainers)) * 100,
        name: 'Losers',
      },
    ];
  }, [Info]);

  const optionPie = {
    color: ['#1AB369', '#FA3363'],
    series: [
      {
        name: 'Gainers / Losers Number',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: false,
        },
        showInLegend: false,
        labelLine: {
          show: false,
        },
        data: DataChart,
      },
    ],
  };

  useEffect(() => {
    if (!info && props.info) setInfo(props.info);
  }, [props, info]);

  return (
    <Flex
      vertical
      gap={24}
      className='shadow-primary bg-white p-4 rounded-lg md:p-6'
    >
      <div className='w-full flex items-center flex-wrap justify-between'>
        <Text weight='bold' size={24} lineHeight={32}>
          Overview
        </Text>
        <Select
          className={cn(
            'min-w-[90px] !h-9 !font-jm',
            '[&_.ant-select-selection-item]:!text-sm'
          )}
          options={filterData}
          defaultValue={filterData[0].value}
          size='large'
          onChange={(value) => getLaunchPadDetail({ time: value })}
        />
      </div>

      <div className='flex flex-wrap w-full items-stretch'>
        <div className='flex-1'>
          <Text size={16} lineHeight={24} className={'!text-[#4F4F4F]'}>
            Gainers / Losers Number
          </Text>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <div className='relative'>
              <ReactECharts
                option={optionPie}
                className='!w-[120px] !h-[120px]'
              />
              {DataChart.length === 0 && (
                <div
                  className={cn(
                    'absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4',
                    'flex flex-col justify-center items-center'
                  )}
                >
                  <Text size={16} lineHeight={12} type='secondary'>
                    N/A
                  </Text>
                </div>
              )}
            </div>
            <div className='flex flex-col gap-2'>
              <Flex align='center' gap={8}>
                <span className='w-3 h-3 rounded-full bg-[#1AB369]'></span>
                <Text type='secondary'>Gainers</Text>
                <Text className='!text-[#1AB369]'>
                  {Info.gainers || '-'}
                  {Info.gainers
                    ? ` (${round(
                        (Info.gainers / (Info.losers + Info.gainers)) * 100,
                        2
                      )}%)`
                    : ''}
                </Text>
              </Flex>
              <Flex align='center' gap={8}>
                <span className='w-3 h-3 rounded-full bg-[#FA3363]'></span>
                <Text type='secondary'>Losers</Text>
                <Text className='!text-[#FA3363]'>
                  {Info.losers || '-'}
                  {Info.losers
                    ? ` (${round(
                        (Info.losers / (Info.losers + Info.gainers)) * 100,
                        2
                      )}%)`
                    : ''}
                </Text>
              </Flex>
            </div>
          </div>
        </div>

        <Divider
          type='vertical'
          className='!mx-8 !h-auto bg-[#E5E6EB] hidden md:block'
        />

        <div className='flex-1'>
          <div>
            <Text size={16} lineHeight={24} className={'!text-[#4F4F4F]'}>
              Watchlist Marketcap
            </Text>
            <Flex gap={4} align='center'>
              <Text weight='semiBold'>
                {nFormatter(Number(Info.marketCap), 2, '$')}
              </Text>
              <Text weight='semiBold' noChildrenStyle>
                {percentFormat(Number(Info.marketCapChange)) || null}
              </Text>
            </Flex>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={Info.dataChart?.marketCaps}
              color='#1AB369'
              height={86}
              width={400}
            />
          </div>
        </div>

        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />

        <div className='flex-1'>
          <div>
            <Text size={16} lineHeight={24} className={'!text-[#4F4F4F]'}>
              Watchlist Volume
            </Text>
            <Flex gap={4} align='center'>
              <Text weight='semiBold'>
                {nFormatter(Number(Info.volume), 2, '$')}
              </Text>
              <Text weight='semiBold' noChildrenStyle>
                {percentFormat(Number(Info.volumeChange)) || null}
              </Text>
            </Flex>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={Info.dataChart?.volumes}
              color='#FA3363'
              height={86}
              width={400}
            />
          </div>
        </div>
      </div>
    </Flex>
  );
}
