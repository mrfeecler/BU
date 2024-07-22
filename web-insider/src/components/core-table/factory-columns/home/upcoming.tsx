import BackersModal from '@/app/[locale]/fundraising/[category]/components/backers-modal';
import LaunchpadModal from '@/app/[locale]/fundraising/[category]/components/launchpad-modal';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { nFormatter2, renderColumnId, renderSortIcon } from '@/helpers';
import { changeImageUrl } from '@/helpers/functions';
import type { ColumnsType } from 'antd/es/table';
import moment from 'moment/moment';

const columns: ColumnsType<any> = [
  {
    ...renderColumnId(),
    key: 'start_date',
    sorter: true,
    render: (value) => (
      <Text weight='semiBold' ellipsis>
        {value._index}
      </Text>
    ),
  },
  {
    key: 'name',
    title: 'Project',
    width: 216,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    render: (value) => (
      <CoreCellName
        labelClassName='font-jb font-bold'
        imagesUrl={[changeImageUrl(value.image)]}
        name={value.project}
        symbol={value.symbol}
        link={`/en/detail/${value.key}`}
        actionTarget='_self'
      />
    ),
  },
  {
    key: 'initialCap',
    title: 'Initial Cap',
    width: 123,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>{nFormatter2(value.initialCap, 2, '$')}</Text>
      );
    },
  },
  {
    key: 'totalRaise',
    title: 'Total Raise',
    width: 135,
    align: 'right',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {value.totalRaise ? nFormatter2(value.totalRaise, 2, '$') : '-'}
        </Text>
      );
    },
  },
  {
    key: 'backers',
    title: 'Backers',
    width: 200,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      if (!value.backers || !value.backers.length) return '-';
      return (
        <BackersModal data={value.backers as any}>
          {({ onOpen }) => (
            <DataGroup data={value.backers} onClick={onOpen} maxWidth={200} />
          )}
        </BackersModal>
      );
    },
  },
  {
    key: 'category_name',
    title: 'Category',
    width: 165,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { category_name }) => {
      return (
        <Text ellipsis weight='semiBold' className='!max-w-[165px]'>
          {category_name}
        </Text>
      );
    },
  },
  {
    key: 'launchpads',
    title: 'Launchpad',
    width: 165,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      if (!value.launchpads || !value.launchpads.length) return '-';

      const launchpad = value.launchpads.map((e: any) => ({
        ...e,
        avatarUrl: e.image,
      }));
      return (
        <LaunchpadModal data={launchpad}>
          {({ onOpen }) => (
            <DataGroup data={launchpad} onClick={onOpen} maxWidth={165} />
          )}
        </LaunchpadModal>
      );
    },
  },
  {
    key: 'start_date',
    title: 'Start Date',
    width: 100,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, value) => {
      return (
        <Text weight='semiBold'>
          {value.start_date ? moment(value.start_date).format('DD MMM YYYY') : "-"}
        </Text>
      );
    },
  },
];

export const upComingMobileColumnsKey = ['name', 'initialCap', 'totalRaise'];

export default columns;
