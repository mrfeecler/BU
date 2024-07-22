import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderColumnId,
  renderSortIcon,
} from '@/helpers';
import { changeImageUrl, cn } from '@/helpers/functions';
import type { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';

const columns: ColumnsType<any> = [
  {
    ...renderColumnId(),
    sorter: (a, b) => a._index - b._index,
    render: (value) => (
      <Text weight='semiBold' ellipsis>
        {value._index}
      </Text>
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 186,
    align: 'left',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (value) => (
      <CoreCellName
        imagesUrl={[changeImageUrl(get(value, 'image.x60', ''))]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
        actionTarget='_self'
      />
    ),
    sortIcon: renderSortIcon,
  },
  {
    key: 'price',
    title: 'Price',
    width: 90,
    align: 'right',
    sorter: (a, b) => a.price - b.price,
    sortDirections: ['ascend', 'descend'],
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {currencyFormat(value.price, '$', {
            displayFull: true,
          })}
        </Text>
      );
    },
    sortIcon: renderSortIcon,
    // sorter: true,
  },
  {
    key: 'priceChangeIn24',
    title: '24h %',
    width: 74,
    align: 'right',
    sorter: (a, b) => a.priceChangeIn24 - b.priceChangeIn24,
    render: (_, value) => {
      return (
        <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
          {percentFormat(value.priceChangeIn24)}
        </Text>
      );
    },
    sortIcon: renderSortIcon,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 110,
    align: 'right',
    render: (_, value) => {
      return (
        <Text weight='semiBold'>{nFormatter(value.volume24h, 2, '$')}</Text>
      );
    },
    sortIcon: renderSortIcon,
    sorter: (a, b) => a.volume24h - b.volume24h,
  },
];

export const gainersMobileColumnsKey = [
  'name',
  'initialCap',
  'priceChangeIn24',
];

export default columns;
