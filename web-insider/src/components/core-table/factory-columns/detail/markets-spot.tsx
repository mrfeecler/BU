import type { ColumnsType } from 'antd/es/table';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
  renderColumnId,
} from '@/helpers';
import { CoreCellName } from '@/components/core-table/core-cell-name';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Exchange',
    dataIndex: 'exchange',
    key: 'exchangeName',
    width: 216,
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'left',
    render: (_, { name, icon }) => (
      <CoreCellName imagesUrl={[icon]} name={name} />
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    align: 'left',
    width: 72,
    sortIcon: renderSortIcon,
    sorter: false,
    render: (_, { tier }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {tier ? tier : '-'}
      </div>
    ),
  },
  {
    title: 'Pair',
    dataIndex: 'paid',
    key: 'symbol',
    width: 198,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { pair }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {pair ? pair : '-'}
      </div>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'usdLast',
    align: 'right',
    width: 198,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { price }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {currencyFormat(+price, '$')}
      </div>
    ),
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24h',
    key: 'usdVolume',
    align: 'right',
    width: 198,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { volume24h }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {nFormatter(volume24h, 2, '$')}
      </div>
    ),
  },
  {
    title: 'Market Share',
    dataIndex: 'exchangePercentVolume',
    key: 'exchangePercentVolume',
    width: 198,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { marketShare }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {percentFormat(marketShare)}
      </div>
    ),
  },
];

export const marketsPotColumnsKey = ['exchangeName', 'price', 'average24h'];

export default columns;
