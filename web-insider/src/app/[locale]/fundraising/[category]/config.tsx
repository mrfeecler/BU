import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { CoreCellName } from '@/components/core-table/core-cell-name';
import {
  getFlagCountry,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { COLOR_CHART } from '@/helpers/constants';
import { formatDate } from '@/helpers/datetime';
import { changeImageUrl } from '@/helpers/functions';
import { Avatar, Flex, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ReactECharts from 'echarts-for-react';
import { round } from 'lodash';
import Link from 'next/link';
import BackersModal from './components/backers-modal';

export const FundraisingCategory = {
  FundingRounds: 'funding-rounds',
  TopBackers: 'top-backers',
  Overview: 'overview',
};

const TEMP_DISABLED_TAGS = [FundraisingCategory.Overview];

export const FundraisingCategoryLabel = {
  [FundraisingCategory.FundingRounds]: 'Funding Rounds',
  [FundraisingCategory.TopBackers]: 'Top Backers',
  [FundraisingCategory.Overview]: 'Overview',
};

export const FundraisingPathApi = {
  [FundraisingCategory.FundingRounds]: 'funding-rounds',
  [FundraisingCategory.TopBackers]: 'top-backers',
  [FundraisingCategory.Overview]: 'overview',
};

export type FundraisingType = keyof typeof FundraisingCategory;

export const validFundraisingType = (type: string): type is FundraisingType => {
  return Object.keys(FundraisingCategory).includes(type);
};

export const getBreadcrumbConfig = (
  category?: FundraisingType,
  locale?: string
) => {
  return [
    {
      title: 'Fundraising',
      url: `/${locale}/fundraising/funding-rounds`,
    },
    {
      title:
        FundraisingCategoryLabel[category ?? FundraisingCategory.FundingRounds],
    },
  ];
};

export const getBreadcrumbDetailConfig = (
  category?: string,
  locale?: string
) => {
  return [
    {
      title: 'Fundraising',
      url: `/${locale}/fundraising/funding-rounds`,
    },
    {
      title:
        FundraisingCategoryLabel[category ?? FundraisingCategory.FundingRounds],
      url: `/${locale}/fundraising/${category}`,
    },
  ];
};

const roundsColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    fixed: true,
    align: 'left',
    width: 24,
    render: (_, record) => {
      return (
        <Text weight='semiBold' ellipsis>
          {record._index}
        </Text>
      );
    },
  },
  {
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    width: 163,
    render: (_, { name, icon, symbol, slug }) => (
      <CoreCellName
        imagesUrl={[icon]}
        name={name}
        symbol={symbol}
        link={`/en/detail/${slug}?tab=fundraising`}
        actionTarget='_self'
      />
    ),
  },
  {
    title: 'Date',
    dataIndex: 'announceDate',
    key: 'date',
    width: 99,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => (
      <Text weight='semiBold'>{formatDate(value) || '-'}</Text>
    ),
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'raise',
    align: 'right',
    width: 138,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (raise) => (
      <Text weight='semiBold'>{nFormatter(raise, 2, '$')}</Text>
    ),
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
    width: 135,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (stage) => (
      <Text weight='semiBold' maxWidth={135} ellipsis>
        {stage || '-'}
      </Text>
    ),
  },
  {
    title: 'Valuation',
    dataIndex: 'raise',
    key: 'raise',
    sortIcon: renderSortIcon,
    sorter: true,
    render: () => <Text weight='semiBold'>-</Text>,
  },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'backers',
    width: 225,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { funds }) =>
      funds?.length > 0 ? (
        <BackersModal data={funds}>
          {({ onOpen }) => (
            <DataGroup data={funds} onClick={onOpen} maxWidth={225} />
          )}
        </BackersModal>
      ) : (
        <Text weight='bold'>-</Text>
      ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 186,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { category }) => (
      <Text weight='semiBold'>{category?.name || '-'}</Text>
    ),
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    fixed: true,
    align: 'left',
    width: 24,
    render: (_, record) => {
      return (
        <Text weight='semiBold' ellipsis>
          {record._index}
        </Text>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    width: 216,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { name, logo, id }) => (
      <Link href={`top-backers/detail/${id}`}>
        <Flex
          align={'center'}
          gap={8}
          className='max-w-[55px] md:max-w-[160px] lg:max-w-[216px]'
        >
          {logo && (
            <img
              src={changeImageUrl(logo)}
              alt={'logo'}
              width={32}
              height={32}
            />
          )}
          <Text weight='bold' ellipsis>
            {name}
          </Text>
        </Flex>
      </Link>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
    width: 83,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (tier) => <Text weight='semiBold'>{tier || '-'}</Text>,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 114,
    align: 'left',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (type) => <Text weight='semiBold'>{type || '-'}</Text>,
  },
  {
    title: 'Country',
    dataIndex: 'location',
    key: 'location',
    sortIcon: renderSortIcon,
    width: 71,
    sorter: true,
    align: 'left',
    render: (_, { country }) => {
      const flag = getFlagCountry(country);
      if (!flag) return <Text weight='semiBold'>-</Text>;
      return (
        <Tooltip title={country} overlayClassName='tooltip-light'>
          <img alt={country} src={flag} width={32} height={18} />
        </Tooltip>
      );
    },
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'totalInvestments',
    sortIcon: renderSortIcon,
    width: 120,
    align: 'right',
    sorter: true,
    render: (_, { investments }) => (
      <Text weight='semiBold'>{investments || '-'}</Text>
    ),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'last_market_cap',
    width: 134,
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    render: (_, { marketCap, mCapChangeIn24h }) => {
      const newMarketCap = nFormatter(marketCap, 2, '$');
      return (
        <Flex vertical>
          {!!newMarketCap && newMarketCap !== '-' ? (
            <>
              <Text weight='semiBold'>{newMarketCap}</Text>
              <Text weight='bold' noChildrenStyle>
                {percentFormat(mCapChangeIn24h)}
              </Text>
            </>
          ) : (
            <Text weight='semiBold'>-</Text>
          )}
        </Flex>
      );
    },
  },
  {
    title: 'Resources',
    dataIndex: 'resources',
    key: 'resources',
    width: 134,
    align: 'right',
    render: (_, { resources = [] }) =>
      resources?.length > 0 ? (
        <Avatar.Group maxCount={3}>
          {(resources as any[])?.map((url, index) => (
            <Avatar key={index} size={32} src={changeImageUrl(url)} />
          ))}
        </Avatar.Group>
      ) : (
        <Text weight='bold'>-</Text>
      ),
  },
  {
    title: 'Gainers',
    dataIndex: 'gainers',
    key: 'gainers',
    sortIcon: renderSortIcon,
    sorter: true,
    align: 'right',
    width: 127,
    render: (value) => (
      <Flex gap={4} align='center' justify='flex-start'>
        <ReactECharts
          style={{ width: 44, height: 44 }}
          className='ml-5'
          option={{
            color: [COLOR_CHART.CRAYOLA, COLOR_CHART.RADICAL_RED],
            series: [
              {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                silent: true,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
                emphasis: {
                  focus: false,
                  scale: false,
                },
                data: [{ value: value }, { value: 100 - value }],
              },
            ],
          }}
        />
        <Text weight='semiBold'>{round(Number(value), 2) || 0}%</Text>
      </Flex>
    ),
  },
];

export const getColumnsFundraising = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return roundsColumns;
    case FundraisingCategory.TopBackers:
      return topBackersColumns;
    default:
      return [];
  }
};

export const getFundraisingTags = () => {
  return Object.values(FundraisingCategory).map((key) => ({
    label: FundraisingCategoryLabel[key],
    value: key,
    disabled: TEMP_DISABLED_TAGS.includes(key),
  }));
};

export const getFundraisingPathApi = (category: string) => {
  switch (category) {
    case FundraisingCategory.FundingRounds:
      return FundraisingPathApi[FundraisingCategory.FundingRounds];
    case FundraisingCategory.TopBackers:
      return FundraisingPathApi[FundraisingCategory.TopBackers];
    default:
      return FundraisingPathApi[FundraisingCategory.Overview];
  }
};
