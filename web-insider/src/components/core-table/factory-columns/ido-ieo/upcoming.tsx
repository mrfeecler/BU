import BankersModal from '@/app/[locale]/ieo-ido/[category]/components/bankers-modal';
import LaunchpadModal from '@/app/[locale]/ieo-ido/[category]/components/launchpad-modal';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    sorter: true,
    fixed: true,
    width: '178px',
    align: 'left',
    sortIcon: renderSortIcon,
    render: (project, { symbol, image, isHot, key }) => (
      <CoreCellName
        link={`/en/detail/${key}?tab=ido/ieo`}
        imagesUrl={[image]}
        name={project}
        symbol={symbol}
        rightNode={
          isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />
        }
      />
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    sortIcon: renderSortIcon,
    sorter: true,
    width: '111px',
    align: 'right',
    render: (_, { initialCap }) => (
      <Text weight='semiBold'>{nFormatter(initialCap, 2, '$')}</Text>
    ),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    sorter: true,
    sortIcon: renderSortIcon,
    align: 'right',
    width: '140px',
    render: (_, { totalRaise }) => (
      <Text weight='semiBold'>{nFormatter(totalRaise, 2, '$')}</Text>
    ),
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    sortIcon: renderSortIcon,
    sorter: true,
    width: '153px',
    align: 'left',
    render: (backers, { ido_platform_id }) =>
      backers != null && backers.length > 0 ? (
        <BankersModal data={backers} platformId={ido_platform_id}>
          {({ onOpen }) => (
            <DataGroup data={backers} onClick={onOpen} maxWidth={149} />
          )}
        </BankersModal>
      ) : (
        '-'
      ),
  },
  {
    title: 'Category',
    dataIndex: 'category_name',
    key: 'category_name',
    sortIcon: renderSortIcon,
    sorter: true,
    width: '153px',
    align: 'left',
    render: (category_name) => (
      <Text weight='semiBold' ellipsis>
        {category_name}
      </Text>
    ),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    width: '153px',
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { launchpads, ido_platform_id }) =>
      launchpads != null && launchpads.length > 0 ? (
        <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
          {({ onOpen }) => (
            <DataGroup data={launchpads} onClick={onOpen} maxWidth={165} />
          )}
        </LaunchpadModal>
      ) : (
        '-'
      ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'start_date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: '85px',
    align: 'center',
    render: (_, { start_date }) => (
      <Text weight='semiBold'>
        {start_date != null && start_date != '-' ? formatDate(start_date) : '-'}
      </Text>
    ),
  },
];

export const idoIeoUpcomingColumnsKey = ['project', 'initialCap'];

export default columns;
