import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  nFormatter,
  percentFormat,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { COLOR_CHART } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { Flex } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';

const columns: ColumnsType<IHomeCategory> = [
  {
    ...renderColumnId(),
    render: (value) => (
      <Text weight='semiBold' ellipsis>
        {value._index}
      </Text>
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 288,
    align: 'left',
    fixed: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={value.rankedCoins.map((c: any) => c.iconUrl)}
        name={value.name}
        symbol={value.symbol}
        link={`/en/categories/${value.id}`}
        labelClassName='font-jb font-bold'
        actionTarget='_self'
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'avgPriceChange',
    title: 'Avg Price Change (24h)',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return (
        <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
          {percentFormat(value.avgPriceChange['24H'])}
        </Text>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'market_cap',
    title: 'Market Cap',
    width: 158,
    align: 'right',
    render: (_, value) => {
      const { marketCapChangeIn24h } = value;
      return (
        <Flex vertical>
          <Text weight='semiBold'>{nFormatter(value.market_cap, 2, '$')}</Text>
          <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
            {marketCapChangeIn24h ? percentFormat(marketCapChangeIn24h) : null}
          </Text>
        </Flex>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    align: 'right',
    width: 158,
    render: (_, value) => {
      const { volumeChangeIn24h } = value;
      return (
        <Flex vertical>
          <Text weight='semiBold'>{nFormatter(value.volume24h, 2, '$')}</Text>
          <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
            {volumeChangeIn24h ? percentFormat(volumeChangeIn24h) : null}
          </Text>
        </Flex>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'dominance',
    title: 'Dominance',
    align: 'right',
    width: 158,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {round(value.dominance, 2) !== 0 ? round(value.dominance, 2) : '0.00'}
          %
        </Text>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'gainers',
    title: 'Gainers',
    align: 'right',
    width: 120,
    render: (_, value) => {
      return (
        <Flex gap={4} align='center' justify='flex-start'>
          <ReactECharts
            style={{ width: 44, height: 44 }}
            className='ml-5'
            option={{
              color: [COLOR_CHART.RADICAL_RED, COLOR_CHART.CRAYOLA],
              series: [
                {
                  type: 'pie',
                  radius: ['40%', '70%'],
                  avoidLabelOverlap: false,
                  silent: true,
                  label: {
                    show: false,
                  },
                  labelLine: {
                    show: false,
                  },
                  emphasis: {
                    focus: false,
                    scale: false,
                  },
                  data: [value.losers, value.gainers],
                },
              ],
            }}
          />
          <Text weight='semiBold'>
            {round((value.gainers / (value.gainers + value.losers)) * 100, 2)}%
          </Text>
        </Flex>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
];

export const categoriesMobileColumnsKey = ['name', 'avgPriceChange'];

export default columns;
