import { IconVerifiedBadge } from '@/assets/icons';
import IconArrowDecrease from '@/assets/icons/IconArrowDecrease';
import IconArrowIncrease from '@/assets/icons/IconArrowIncrease';
import IconTop1 from '@/assets/icons/IconTop1';
import IconTop2 from '@/assets/icons/IconTop2';
import IconTop3 from '@/assets/icons/IconTop3';
import { RangeKolsComponent } from '@/components/RangeKOLs';
import Text from '@/components/Text';
import { DEFAULT_USER_AVATAR } from '@/helpers/constants';
import { Flex, TableProps } from 'antd';
import Image from 'next/image';
import { dollarFormat } from '../../../../../../helpers/functions';
import { TTopKOLData } from '../Context/TopKOLContext';

export const ColumnsTable: TableProps<TTopKOLData>['columns'] = [
  {
    key: 'rank',
    title: <Text weight='bold'>Rank</Text>,
    dataIndex: 'rank',
    width: 72,
    align: 'center',
    sorter: true,
    render: (value) => {
      let Content = (
        <Text weight='bold' size={20} lineHeight={28}>
          {value}
        </Text>
      );
      if (value === 1) Content = <IconTop1 />;
      if (value === 2) Content = <IconTop2 />;
      if (value === 3) Content = <IconTop3 />;
      return <Flex justify='center'>{Content}</Flex>;
    },
  },
  {
    key: 'rankChange',
    title: '',
    width: 28,
    align: 'center',
    render: (_, { rank_change, rank_change_type }) => {
      const Content = rank_change || '-';

      let Icon = null;
      if (rank_change)
        if (rank_change_type === 'up') Icon = <IconArrowIncrease />;
        else Icon = <IconArrowDecrease />;

      return (
        <Flex vertical align='center'>
          {Icon}
          <Text weight='bold' size={12} type='secondary'>
            {Content}
          </Text>
        </Flex>
      );
    },
  },
  {
    key: 'name',
    title: <Text weight='bold'>Name</Text>,
    dataIndex: 'name',
    width: 288,
    sorter: true,
    render: (value, { avatar, blue_badge }) => {
      return (
        <Flex gap={16} align='center' className='max-w-[228px]'>
          <Image
            quality={100}
            src={avatar}
            alt={value}
            width={44}
            height={44}
            onError={(e) => {
              e.currentTarget.srcset = DEFAULT_USER_AVATAR;
            }}
            className='rounded-full'
          />
          <Flex gap={4} align='center'>
            <Text weight='bold' ellipsis>
              {value}
            </Text>
            {blue_badge && <IconVerifiedBadge />}
          </Flex>
        </Flex>
      );
    },
  },
  {
    key: 'tier',
    title: <Text weight='bold'>Tier</Text>,
    dataIndex: 'tier',
    align: 'center',
    width: 88,
    sorter: true,
    render: (value) => {
      return <Text>{value}</Text>;
    },
  },
  {
    key: 'country',
    title: <Text weight='bold'>Country</Text>,
    dataIndex: 'country',
    align: 'center',
    width: 244,
    sorter: true,
    render: (value) => {
      const src = `/Flag/Country=${value}, Style=Flag, Radius=Off.svg`;
      return (
        <Flex justify='center'>
          {value ? <Image src={src} width={42} height={30} alt={value} /> : '-'}
        </Flex>
      );
    },
  },
  {
    key: 'followers',
    title: <Text weight='bold'>Followers</Text>,
    dataIndex: 'followers',
    width: 128,
    sorter: true,
    render: (value) => {
      return (
        <Text>
          {dollarFormat(value, {
            maxDigits: 0,
            removeSymbol: true,
          })}
        </Text>
      );
    },
  },
  {
    key: 'scores',
    title: <Text weight='bold'>Score</Text>,
    dataIndex: 'score',
    align: 'center',
    width: 288,
    sorter: true,
    render: (_value, { scores, score_change }) => {
      return (
        <Flex justify='center' className='w-full'>
          <RangeKolsComponent value={scores} valueChange={score_change} />
        </Flex>
      );
    },
  },
];
