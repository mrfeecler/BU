import { nFormatter, renderColumnId, renderSortIcon } from '@/helpers';
import type { ColumnsType } from 'antd/es/table';

import Text from '@/components/Text';
import { changeImageUrl } from '@/helpers/functions';
import { Flex, Tag } from 'antd';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';
import Link from 'next/link';

const columns: ColumnsType<any> = [
  renderColumnId(),
  {
    title: 'Name',
    dataIndex: 'project',
    key: 'name',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    align: 'left',
    width: 144,
    render: (_, { name, image, tag, key }) => (
      <Link href={`/en/ieo-ido/top-ido-launchpads/${key}`}>
        <Flex align={'center'} gap={8} className='max-w-[144px]'>
          <img
            src={changeImageUrl(image)}
            alt={'icon'}
            width={24}
            height={24}
          />
          <Text weight='bold' ellipsis>
            {name}
          </Text>
          {tag && (
            <Tag className={'bg-[#F1F4F7]'} bordered={false}>
              {tag}
            </Tag>
          )}
        </Flex>
      </Link>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    sortIcon: renderSortIcon,
    sorter: false,
    align: 'right',
    width: 71,
    render: (value) => <Text weight='semiBold'>{value}</Text>,
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'avg_roi_current',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 116,
    render: (_, { roi }) => (
      <Text weight='semiBold'>{roi ? `${roi.toFixed(2)}x` : '-'}</Text>
    ),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'avg_roi_ath',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 121,
    render: (_, { athRoi }) => (
      <Text weight='semiBold'>{athRoi ? `${athRoi.toFixed(2)}x` : '-'}</Text>
    ),
  },
  {
    title: 'IDOs',
    dataIndex: 'idos',
    key: 'projectsCount',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 130,
    render: (value) => <Text weight='semiBold'>{value}</Text>,
  },
  {
    title: 'Sum Market Cap',
    dataIndex: 'sumMarketCap',
    key: 'marketCap',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 178,
    render: (_, { sumMarketCap }) => (
      <Text weight='semiBold'>{nFormatter(sumMarketCap, 2, '$')}</Text>
    ),
  },
  {
    title: 'Entry',
    dataIndex: 'enterPrice',
    key: 'enterPrice',
    align: 'right',
    width: 143,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { entry }) => (
      <Text weight='semiBold'>{nFormatter(entry, 2, '$')}</Text>
    ),
  },
  {
    title: 'Gainers',
    dataIndex: 'gainer',
    key: 'gainers',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 143,
    render: (value) => {
      const optionPie = {
        color: ['#1AB369', '#FA3363'],
        series: [
          {
            name: 'Gainers',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              show: false,
            },
            showInLegend: false,
            labelLine: {
              show: false,
            },
            data: [
              {
                value: Number(value),
                name: 'Gainers',
              },
              {
                value: 100 - Number(value),
                name: 'Losers',
              },
            ],
          },
        ],
      };
      return value ? (
        <Flex gap={12} align='center' justify='flex-start' className='pl-8'>
          <ReactECharts option={optionPie} className='!w-[44px] !h-[44px]' />
          <Text weight='semiBold'>{round(Number(value), 2) || 0}%</Text>
        </Flex>
      ) : (
        <Text weight='semiBold'>-</Text>
      );
    },
  },
];

export const idoIeoTopIdoLaunchPadsColumnsKey = ['name', 'roi', 'avg_roi_ath'];

export default columns;
