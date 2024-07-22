import type { ColumnsType } from 'antd/es/table';
import { nFormatter, renderSortIcon, renderColumnId } from '@/helpers';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import Image from 'next/image';
import BankersModal from '@/app/[locale]/ieo-ido/[category]/components/bankers-modal';
import DataGroup from '@/components/DataGroup';
import LaunchpadModal from '@/app/[locale]/ieo-ido/[category]/components/launchpad-modal';
import { formatDate } from '@/helpers/datetime';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    sorter: true,
    fixed: true,
    width: 196,
    align: 'left',
    sortIcon: renderSortIcon,
    render: (project, { symbol, image, isHot, key }) => (
      <CoreCellName
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
    width: 123,
    align: 'right',
    render: (_, { initialCap }) => nFormatter(initialCap, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    sorter: true,
    sortIcon: renderSortIcon,
    align: 'right',
    width: 135,
    render: (_, { totalRaise }) => nFormatter(totalRaise, 2, '$'),
  },
  {
    title: 'Backers',
    dataIndex: 'backers',
    key: 'backers',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 149,
    align: 'left',
    render: (backers, { ido_platform_id }) =>
      backers != null && backers.length > 0 ? (
        <BankersModal data={backers} platformId={ido_platform_id}>
          {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
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
    width: 165,
    align: 'left',
    render: (category_name) => `${category_name}`,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    width: 165,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { launchpads, ido_platform_id }) =>
      launchpads != null && launchpads.length > 0 ? (
        <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
          {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
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
    width: 84,
    align: 'center',
    render: (_, { start_date }) =>
      start_date != null && start_date != '-' ? formatDate(start_date) : '-',
  },
];

export const idoIeoTopIeoLaunchPadsColumnsKey = ['project', 'initialCap'];

export default columns;
