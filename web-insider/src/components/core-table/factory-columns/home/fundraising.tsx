import BackersModal from '@/app/[locale]/fundraising/[category]/components/backers-modal';
import { IFundraising } from '@/app/home/fundraising/props';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import { changeImageUrl } from '@/helpers/functions';
import type { ColumnsType } from 'antd/es/table';
import { get } from 'lodash';
import moment from 'moment/moment';

const columns: ColumnsType<IFundraising> = [
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
    title: 'Project',
    width: 163,
    align: 'left',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => (
      <CoreCellName
        labelClassName='font-jb font-bold'
        imagesUrl={[changeImageUrl(value.icon)]}
        name={value.name}
        symbol={value.key}
        link={`/en/detail/${value.slug}`}
        actionTarget='_self'
      />
    ),
  },
  {
    key: 'date',
    title: 'Date',
    dataIndex: 'announceDate',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 99,
    align: 'left',
    render: (value) => (
      <Text weight='semiBold'>{moment(value).format('DD MMM YYYY')}</Text>
    ),
  },
  {
    key: 'raise',
    title: 'Amount Raised',
    width: 138,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => {
      return (
        <Text weight='semiBold'>
          {value.raise ? nFormatter(+value.raise, 2, '$') : '-'}
        </Text>
      );
    },
  },
  {
    key: 'stage',
    title: 'Round',
    width: 135,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => <Text weight='semiBold'>{value.stage}</Text>,
  },
  {
    key: 'valuation',
    title: 'Valuation',
    width: 102,
    sortIcon: renderSortIcon,
    sorter: false,
    align: 'right',
    render: (value) => (
      <Text weight='semiBold'>
        {value.valuation ? nFormatter(+value.valuation, 2, '$') : '-'}
      </Text>
    ),
  },
  {
    key: 'backers',
    title: 'Backers',
    width: 225,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => {
      const funds = get(value, 'funds', []);
      if (!funds.length) return '-';
      return (
        <BackersModal data={funds}>
          {({ onOpen }) => (
            <DataGroup data={funds} onClick={onOpen} maxWidth={225} />
          )}
        </BackersModal>
      );
    },
  },
  {
    key: 'category_name',
    title: 'Category',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 186,
    align: 'left',
    render: (value) => <Text weight='semiBold'>{value.category?.name}</Text>,
  },
];

export const fundraisingMobileColumnsKey = ['name', 'announceDate'];

export default columns;
