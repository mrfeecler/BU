import BankersModal from '@/app/[locale]/ieo-ido/[category]/components/bankers-modal';
import LaunchpadModal from '@/app/[locale]/ieo-ido/[category]/components/launchpad-modal';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import { changeImageUrl } from '@/helpers/functions';
import { Flex, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import Link from 'next/link';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    width: 196,
    render: (project, { symbol, image, isHot, key }) => (
      <Flex wrap='wrap' gap={8} className='!max-w-[196px]'>
        <img src={changeImageUrl(image)} alt={'icon'} width={24} height={24} />
        <Flex gap={4} align='center'>
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
          {isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />}
        </Flex>
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 123,
    render: (_, { initialCap }) => (
      <Text weight='semiBold'>{nFormatter(initialCap, 2, '$')}</Text>
    ),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaise',
    key: 'totalRaise',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 151,
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
    width: 162,
    render: (backers, { ido_platform_id }) =>
      backers?.length > 0 ? (
        <BankersModal data={backers} platformId={ido_platform_id}>
          {({ onOpen }) => (
            <DataGroup data={backers} onClick={onOpen} maxWidth={162} />
          )}
        </BankersModal>
      ) : (
        '-'
      ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 162,
    render: ({ name }) => (
      <Text weight='semiBold' maxWidth={162} ellipsis>
        {name}
      </Text>
    ),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 162,
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => (
          <DataGroup data={launchpads} onClick={onOpen} maxWidth={162} />
        )}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'start_date',
    sortIcon: renderSortIcon,
    sorter: true,
    width: 92,
    render: (_, { start_date }) => (
      <Text weight='semiBold'>{formatDate(start_date)}</Text>
    ),
  },
];

export const idoIeoUpcomingDeteailColumnsKey = ['project', 'initialCap'];

export default columns;
