import type { ColumnsType } from 'antd/es/table';
import { currencyFormat, nFormatter, renderSortIcon } from '@/helpers';
import moment from 'moment/moment';

const columns: ColumnsType<any> = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 100,
    sorter: true,
    sortIcon: renderSortIcon,
    render: (_, { date }) => (
      <div className='text-sm text-grey-700 font-semibold font-jsb'>
        {date ? moment(date).format('DD MMM YYYY') : '-'}
      </div>
    ),
  },
  {
    title: 'Open',
    dataIndex: 'open',
    key: 'open',
    width: 100,
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    render: (_, { open }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {open ? currencyFormat(open, '$') : '-'}
      </div>
    ),
  },
  {
    title: 'High',
    dataIndex: 'high',
    key: 'high',
    width: 100,
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    render: (_, { high }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {high ? currencyFormat(high, '$') : '-'}
      </div>
    ),
  },
  {
    title: 'Low',
    dataIndex: 'low',
    key: 'low',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { low }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {low ? currencyFormat(low, '$') : '-'}
      </div>
    ),
  },
  {
    title: 'Close',
    dataIndex: 'close',
    key: 'close',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { close }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {close ? currencyFormat(close, '$') : '-'}
      </div>
    ),
  },
  {
    title: 'Volume',
    dataIndex: 'volume',
    key: 'volume',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { volume }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {volume ? nFormatter(volume, 2, '$') : '-'}
      </div>
    ),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketcap',
    key: 'marketcap',
    sorter: true,
    align: 'right',
    sortIcon: renderSortIcon,
    width: 100,
    render: (_, { marketcap }) => (
      <div className='text-right text-sm text-grey-700 font-semibold font-jsb'>
        {marketcap ? nFormatter(marketcap, 2, '$') : '-'}
      </div>
    ),
  },
];

export const marketsHistoricalsColumnsKey = ['date', 'volume', 'marketcap'];

export default columns;
