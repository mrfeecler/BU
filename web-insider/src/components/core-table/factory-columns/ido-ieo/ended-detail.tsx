import LaunchpadModal from '@/app/[locale]/ieo-ido/[category]/components/launchpad-modal';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import { changeImageUrl } from '@/helpers/functions';
import { Flex, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    width: 196,
    render: (_, { project, icon, symbol, key }) => (
      <Flex align={'center'} gap={8} className='!max-w-[196px]'>
        <img src={changeImageUrl(icon)} alt={'icon'} width={24} height={24} />
        <Flex align='center' gap={4}>
          <Link href={`/en/detail/${key}`} target='_blank'>
            <Text weight='bold' ellipsis>
              {project}
            </Text>
          </Link>
          <Tag className={'bg-[#EEF2F6]'} bordered={false}>
            <Text type='secondary' size={12}>
              {symbol}
            </Text>
          </Tag>
        </Flex>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'currentPrice',
    key: 'price',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 122,
    render: (value) => (
      <Text weight='semiBold'>{nFormatter(value, 2, '$')}</Text>
    ),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaised',
    key: 'raise',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 140,
    render: (value) => (
      <Text weight='semiBold'>{nFormatter(value, 2, '$')}</Text>
    ),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 140,
    render: (_, { roi }) => (
      <Text weight='semiBold'>{nFormatter(roi, 2, '$')}</Text>
    ),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'athRoi',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 140,
    render: (value) => (
      <Text weight='semiBold'>{nFormatter(value, 2, '$')}</Text>
    ),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 211,
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => (
          <DataGroup data={launchpads} onClick={onOpen} maxWidth={211} />
        )}
      </LaunchpadModal>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'start_date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 92,
    render: (value) => <Text weight='semiBold'>{formatDate(value)}</Text>,
  },
];

export const idoIeoEndedDetailColumnsKey = ['name', 'price', 'totalRaised'];

export default columns;
