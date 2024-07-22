import DataGroup from '@/components/DataGroup';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { currencyFormat } from '@/helpers';
import { formatDate } from '@/helpers/datetime';
import { changeImageUrl } from '@/helpers/functions';
import { Flex } from 'antd';
import { ColumnsType } from 'antd/es/table';
import BackersModal from '../../components/backers-modal';
import { FundraisingCategory } from '../../config';

export const roundsColumns: ColumnsType<any> = [
  {
    title: '#',
    dataIndex: 'index',
    key: 'index',
    fixed: true,
    align: 'left',
    width: 24,
    render: (_, { _index }) => {
      return <Text weight='semiBold'>{_index}</Text>;
    },
  },
  {
    title: 'Project',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    width: 220,
    render: (_, { name, icon, symbol }) => (
      <Flex align={'center'} gap={8} className='max-w-[220px]'>
        {icon ? (
          <img src={changeImageUrl(icon)} alt={'icon'} width={24} height={24} />
        ) : (
          ''
        )}
        <Flex gap={4} align='center'>
          <Text weight='bold' ellipsis>
            {name}
          </Text>
          {symbol && (
            <Tag>
              <Text size={12} type='secondary'>
                {symbol}
              </Text>
            </Tag>
          )}
        </Flex>
      </Flex>
    ),
    sorter: true,
  },
  {
    title: 'Date',
    dataIndex: 'announceDate',
    key: 'date',
    width: 99,
    render: (_, { date }) => <Text weight='semiBold'>{formatDate(date)}</Text>,
    sorter: true,
  },
  {
    title: 'Amount Raised',
    dataIndex: 'raise',
    key: 'raise',
    align: 'right',
    width: 118,
    render: (raise) => (
      <Text weight='semiBold'>{currencyFormat(raise, '$') || '-'}</Text>
    ),
    sorter: true,
  },
  {
    title: 'Round',
    dataIndex: 'stage',
    key: 'stage',
    width: 118,
    sorter: true,
    render: (value) => <Text weight='semiBold'>{value}</Text>,
  },
  // {
  //   title: 'Valuation',
  //   dataIndex: 'raise',
  //   key: 'raise',
  //   render: () => "-",
  //   sorter: true,
  // },
  {
    title: 'Backers',
    dataIndex: 'funds',
    key: 'backers',
    sorter: true,
    width: 225,
    render: (_, { funds }) => (
      <BackersModal data={funds}>
        {({ onOpen }) => (
          <DataGroup data={funds} onClick={onOpen} maxWidth={225} />
        )}
      </BackersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category_name',
    width: 198,
    render: (value) => (
      <Text ellipsis weight='semiBold' maxWidth={198}>
        {value}
      </Text>
    ),
    sorter: true,
  },
];

const topBackersColumns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    fixed: true,
    render: (_, { name, logo }) => (
      <Flex align={'center'} gap={8}>
        {logo ? (
          <img src={changeImageUrl(logo)} alt={'logo'} width={24} height={24} />
        ) : (
          ''
        )}
        <span>{name}</span>
      </Flex>
    ),
  },
  {
    title: 'Tier',
    dataIndex: 'tier',
    key: 'tier',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    render: (_, { location }) => <>{location}</>,
  },
  {
    title: 'Investments',
    dataIndex: 'investments',
    key: 'investments',
    render: (_, { totalInvestments }) => <>{totalInvestments}</>,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: (_, { market_cap }) => (
      <Flex vertical className='font-bold'>
        <span>${market_cap}M</span>
        <span className={'text-[#1AB369]'}>{market_cap}%</span>
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
