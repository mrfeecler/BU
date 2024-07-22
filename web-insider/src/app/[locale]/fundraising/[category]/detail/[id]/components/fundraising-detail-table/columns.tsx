import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import { IPortfolios } from '../../../../types';
import { roundsColumns } from '../../config';

const columnPorfolio: ColumnsType<IPortfolios> = [
  {
    key: 'id',
    title: '#',
    align: 'left',
    fixed: true,
    width: 56,
    render: (_, record) => (
      <Text weight='semiBold' ellipsis>
        {record._index}
      </Text>
    ),
  },
  {
    key: 'name',
    title: 'Name',
    width: 248,
    align: 'left',
    fixed: true,
    render: (_, value) => (
      <CoreCellName
        imagesUrl={[get(value, 'logo.x60', '')]}
        name={value.name}
        symbol={value.ticker}
        link={`/en/detail/${value.key}`}
      />
    ),
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price',
    title: 'Price',
    width: 200,
    align: 'right',
    render: (_, value) => {
      return (
        <Text weight='semiBold'>{currencyFormat(value.price, '$') || '-'}</Text>
      );
    },
    sortIcon: renderSortIcon,
    sorter: true,
  },
  {
    key: 'price24hPercent',
    title: '24h %',
    width: 167,
    align: 'right',
    render: (_, { price24hPercent }) => {
      return (
        <Text weight='semiBold' noChildrenStyle>
          {price24hPercent ? percentFormat(price24hPercent) : '-'}
        </Text>
      );
    },
    sorter: true,
  },
  {
    key: 'volume24h',
    title: 'Volume (24h)',
    width: 186,
    align: 'right',
    render: (_, value: any) => {
      return (
        <Text weight='semiBold'>{nFormatter(value.volume24h, 2, '$')}</Text>
      );
    },
    sorter: true,
  },
  {
    key: 'marketCap',
    title: 'Market Cap',
    width: 168,
    align: 'right',
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {nFormatter(Number(value.marketCap), 2, '$')}
        </Text>
      );
    },
    sorter: true,
  },
];

export const tabFundraisingTable = {
  por: columnPorfolio,
  fun: roundsColumns,
};
