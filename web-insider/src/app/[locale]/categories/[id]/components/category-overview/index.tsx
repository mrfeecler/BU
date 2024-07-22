import IconChevronDown from '@/assets/icons/IconChevronDown';
import Text from '@/components/Text';
import { nFormatter, percentFormat } from '@/helpers';
import { TIME_FILTER } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { Divider, Flex, Select, SelectProps } from 'antd';
import ReactECharts from 'echarts-for-react';
import { useMemo, useState } from 'react';
import { CategoryOverviewType } from '../../types';
import GraphLine from '../graph-line';

const filterData: SelectProps['options'] = [
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
  category: CategoryOverviewType;
  onFilter: ({ time }: { time: TIME_FILTER }) => void;
};

export default function CategoryOverview(props: PropsType) {
  const { gainers, losers, categoryVolumn, name, gainerPercent, loserPercent } =
    props.category;

  const [selectTimeVisible, setSelectTimeVisible] = useState(false);

  const handleSelectTimeVisible = (open: boolean) => setSelectTimeVisible(open);

  const Color = useMemo(() => {
    const MakeColor = (value: number | string) =>
      Number(value) <= 0 ? '#FA3363' : '#1AB369';

    return {
      marketcap: MakeColor(categoryVolumn?.marketCapChange || 0),
      volume: MakeColor(categoryVolumn?.volumeChange || 0),
    };
  }, [categoryVolumn]);

  const optionPie = {
    color: ['#1AB369', '#FA3363'],
    series: [
      {
        name: 'Gainers / Losers Number',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: {
          borderRadius: 0,
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
        data: [
          {
            value: gainerPercent,
            name: 'Gainers',
          },
          {
            value: loserPercent,
            name: 'Losers',
          },
        ],
      },
    ],
  };

  return (
    <Flex vertical gap={24} className='category-overview container-shadow p-6'>
      <Flex align='center' justify='space-between' wrap='wrap'>
        <Text weight='bold' size={24} lineHeight={32}>
          {name}
        </Text>
        <Select
          open={selectTimeVisible}
          suffixIcon={
            <div className={cn(selectTimeVisible && 'rotate-180')}>
              <IconChevronDown />
            </div>
          }
          defaultValue={TIME_FILTER['24H']}
          options={filterData}
          onDropdownVisibleChange={handleSelectTimeVisible}
          onChange={(value) => props.onFilter({ time: value })}
          className={cn('!h-9 !font-jm', '[&_.ant-select-selection-item]:mr-3')}
        />
      </Flex>

      <Divider className='!border-[#E5E6EB] !m-0' />

      <div className='flex flex-wrap w-full items-stretch'>
        <div className='flex-1'>
          <Text size={16} lineHeight={24} className='text-[#4F4F4F]'>
            Gainers / Losers Number
          </Text>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <ReactECharts
              option={optionPie}
              className='!w-[120px] !h-[120px]'
            />
            <Flex vertical gap={8}>
              <Flex align='center' gap={8}>
                <span className='w-3 h-3 rounded-full bg-[#1AB369]'></span>
                <Text type='secondary'>Gainers</Text>
                <Text className='!text-[#1AB369]'>
                  {gainers} ({nFormatter(gainerPercent, 2, ' ')}%)
                </Text>
              </Flex>
              <Flex align='center' gap={8}>
                <span className='w-3 h-3 rounded-full bg-[#FA3363]'></span>
                <Text type='secondary'>Losers</Text>
                <Text className='!text-[#FA3363]'>
                  {losers} ({nFormatter(loserPercent, 2, ' ')}%)
                </Text>
              </Flex>
            </Flex>
          </div>
        </div>
        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />
        <div className='flex-1'>
          <div>
            <Text size={16} lineHeight={24} className='!text-[#4F4F4F]'>
              Watchlist Marketcap
            </Text>
            <div className='flex gap-1 items-center'>
              <Text weight='semiBold'>
                {nFormatter(Number(categoryVolumn?.marketCap || 0), 2, '$')}
              </Text>
              <Text weight='semiBold' noChildrenStyle>
                {percentFormat(Number(categoryVolumn?.marketCapChange || 0)) ||
                  null}
              </Text>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={categoryVolumn ? categoryVolumn.dataChart.marketCaps : []}
              color={Color.marketcap}
              height={86}
              width={400}
            />
          </div>
        </div>
        <div className='w-[1px] mx-8 h-auto bg-[#E5E6EB] hidden md:block' />
        <div className='flex-1'>
          <div>
            <Text size={16} lineHeight={24} className='!text-[#4F4F4F]'>
              Watchlist Volume
            </Text>
            <div className='flex gap-1 items-center'>
              <Text weight='semiBold'>
                {nFormatter(Number(categoryVolumn?.volume || 0), 2, '$')}
              </Text>
              <Text weight='semiBold' noChildrenStyle>
                {percentFormat(Number(categoryVolumn?.volumeChange || 0)) ||
                  null}
              </Text>
            </div>
          </div>
          <div className='py-8 gap-6 flex flex-1 items-center justify-center'>
            <GraphLine
              data={categoryVolumn ? categoryVolumn.dataChart.volumes : []}
              color={Color.volume}
              height={86}
              width={400}
            />
          </div>
        </div>
      </div>
    </Flex>
  );
}
