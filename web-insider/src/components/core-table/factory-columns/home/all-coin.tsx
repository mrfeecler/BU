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
    render: (value) => (
      <Text weight='semiBold' ellipsis>
        {value._index}
      </Text>
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 216,
    align: 'left',
    fixed: true,
    render: (value) => (
      <CoreCellName
        imagesUrl={[get(value, 'image.x60', '')]}
        name={value.name}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
        labelClassName='font-jb font-bold'
        actionTarget='_self'
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    dataIndex: 'price',
    width: 120,
    align: 'right',
    render: (value, { isPriceIncrease, isPriceDecrease }, i) => {
      return (
        <Text
          id={i.toString()}
          weight='semiBold'
          className={cn(
            isPriceIncrease === true && 'animate-increase',
            isPriceDecrease === true && 'animate-decrease'
          )}
        >
          {value
            ? currencyFormat(value, '$', {
                displayFull: true,
              })
            : '-'}
        </Text>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'priceChangeIn24h',
    title: '24h %',
    width: 135,
    align: 'right',
    render: (value) => (
      <Text weight='semiBold' className={cn('[&>*]:!m-0')}>
        {value.priceChangeIn24h ? percentFormat(value.priceChangeIn24h) : '-'}
      </Text>
    ),
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 154,
    align: 'right',
    render: (value) => (
      <Text weight='semiBold'>{nFormatter(value.volume24h, 2, '$')}</Text>
    ),
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 135,
    align: 'right',
    render: (value) => (
      <Text weight='semiBold'>{nFormatter(+value.marketCap, 2, '$')}</Text>
    ),
    sorter: true,
  },
  {
    key: 'chart',
    title: 'Price Graph (7d)',
    width: 229,
    align: 'right',
    render: (value) =>
      value.chart && (
        <div className='flex items-center justify-end'>
          <img
            alt='chart'
            width={136}
            height={40}
            src={changeImageUrl(value.chart)}
          />
        </div>
      ),
  },
];

export const allCoinsMobileColumnsKey = ['name', 'price', 'average24h'];

export default columns;
