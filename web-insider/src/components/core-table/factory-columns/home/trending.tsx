import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  currencyFormat,
  nFormatter2,
  percentFormat2,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import type { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';

const columns: ColumnsType<any> = [
  {
    ...renderColumnId(),
    key: 'c_marketCap',
    sorter: true,
    render: (value) => (
      <Text weight='semiBold' ellipsis>
        {value._index}
      </Text>
    ),
  },
  {
    key: 'c_name',
    title: 'Name',
    width: 216,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => (
      <CoreCellName
        labelClassName='font-jb font-bold'
        imagesUrl={[get(value, 'image.x60', '')]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
        actionTarget='_self'
      />
    ),
  },

  {
    key: 'c_price',
    title: 'Price',
    width: 119,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {currencyFormat(value.price, '$', {
            displayFull: true,
          })}
        </Text>
      );
    },
  },
  {
    key: 'average24h',
    title: '24h %',
    width: 135,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
          {percentFormat2(value.average24h)}
        </Text>
      );
    },
  },
  {
    key: 'c_volume24h',
    title: 'Volume (24h)',
    width: 154,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>{nFormatter2(value.volume24h, 2, '$')}</Text>
      );
    },
  },
  {
    key: 'c_marketCap',
    title: 'Market Cap',
    width: 154,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>{nFormatter2(value.marketCap, 2, '$')}</Text>
      );
    },
  },
  {
    key: 'graph',
    title: 'Price Graph (7d)',
    width: 229,
    align: 'right',
    sortIcon: renderSortIcon,
    render: (_, value) => {
      return (
        <div className='flex items-center justify-end'>
          <img width={136} height={40} src={changeImageUrl(value.chart)} />
        </div>
      );
    },
  },
];

export const trendingMobileColumnsKey = ['name', 'price', 'average24h'];

export default columns;
