import {
  IconDiscord,
  IconFile,
  IconGithub,
  IconLinkedIn,
  IconMedium,
  IconTelegram,
  IconTwitter,
} from '@/assets/icons';
import { IconFacebook } from '@/assets/icons/IconFacebook';
import IconWeb from '@/assets/icons/IconWeb';
import { IconYoutube } from '@/assets/icons/IconYoutube';
import DataGroup from '@/components/DataGroup';
import Text from '@/components/Text';
import { nFormatter, renderSortIcon } from '@/helpers';
import { COLOR_CHART } from '@/helpers/constants';
import { formatDate } from '@/helpers/datetime';
import { changeImageUrl } from '@/helpers/functions';
import { Flex, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { ReactNode } from 'react';
import BankersModal from './components/bankers-modal';
import LaunchpadModal from './components/launchpad-modal';

export const IeoIdoCategory = {
  upcoming: 'upcoming',
  ongoing: 'ongoing',
  ended: 'ended',
  topIeoLaunchpads: 'top-ieo-launchpads',
  topIdoLaunchpads: 'top-ido-launchpads',
  overview: 'overview',
};

export const IeoIdoApiPath = {
  [IeoIdoCategory.upcoming]: 'ieo-ido',
  [IeoIdoCategory.ongoing]: 'ieo-ido',
  [IeoIdoCategory.ended]: 'ieo-ido',
  [IeoIdoCategory.topIeoLaunchpads]: 'ieo-ido',
  [IeoIdoCategory.topIdoLaunchpads]: 'ieo-ido/top-launch-pad',
  [IeoIdoCategory.overview]: 'ieo-ido',
};

export const IeoIdoStatus = {
  [IeoIdoCategory.upcoming]: 'upcoming',
  [IeoIdoCategory.ended]: 'past',
};

export const IeoIdoApiSearchPath = {
  [IeoIdoCategory.upcoming]: 'ieo-ido/upcoming/search',
  // [IeoIdoCategory.ongoing]: 'ieo-ido',
  [IeoIdoCategory.ended]: 'ieo-ido/ended/search',
  // [IeoIdoCategory.topIeoLaunchpads]: 'ieo-ido',
  [IeoIdoCategory.topIdoLaunchpads]: 'ieo-ido/top-ido-launch-pad/search',
  // [IeoIdoCategory.overview]: 'ieo-ido',
};

const TEMP_DISABLED_TAGS = [
  IeoIdoCategory.ongoing,
  IeoIdoCategory.topIeoLaunchpads,
  IeoIdoCategory.overview,
];

export const IeoIdoCategoryLabel = {
  [IeoIdoCategory.upcoming]: 'Upcoming',
  [IeoIdoCategory.ongoing]: 'Ongoing',
  [IeoIdoCategory.ended]: 'Ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'Top IEO Launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'Top IDO Launchpads',
  [IeoIdoCategory.overview]: 'Overview',
};

export const IeoIdoCategoryPath = {
  [IeoIdoCategory.upcoming]: 'upcoming',
  [IeoIdoCategory.ongoing]: 'ongoing',
  [IeoIdoCategory.ended]: 'ended',
  [IeoIdoCategory.topIeoLaunchpads]: 'top-ieo/launchpads',
  [IeoIdoCategory.topIdoLaunchpads]: 'top-ido/launchpads',
  [IeoIdoCategory.overview]: 'overview',
};

const columnsUpcomingDetail: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, record, index) => (
      <Text weight='semiBold'>{index + 1}</Text>
    ),
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    fixed: true,
    sortIcon: renderSortIcon,
    sorter: true,
    render: (project, { symbol, image, isHot }) => (
      <Flex wrap='wrap' gap={8}>
        <img src={changeImageUrl(image)} alt={'icon'} width={24} height={24} />
        <Text weight='bold'>{project}</Text>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {symbol}
        </Tag>
        {isHot && <Image alt='hot' src={'/hot.svg'} width={12} height={12} />}
      </Flex>
    ),
  },
  {
    title: 'Initial Cap',
    dataIndex: 'initialCap',
    key: 'initialCap',
    sortIcon: renderSortIcon,
    sorter: true,
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
    render: (backers, { ido_platform_id }) => (
      <BankersModal data={backers} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={backers} onClick={onOpen} />}
      </BankersModal>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    sortIcon: renderSortIcon,
    sorter: true,
    render: ({ name }) => <Text weight='semiBold'>{name}</Text>,
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'startedDate',
    key: 'start_date',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { start_date }) => <Text>{formatDate(start_date)}</Text>,
  },
];

const columnsEndedDetail: ColumnsType<any> = [
  {
    title: '#',
    render: (_text, _record, index) => `${index + 1}`,
    fixed: true,
    width: 24,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'name',
    sortIcon: renderSortIcon,
    sorter: true,
    fixed: true,
    render: (_, { project, icon, symbol }) => (
      <Flex align={'center'} gap={8}>
        <img src={changeImageUrl(icon)} alt={'icon'} width={24} height={24} />
        <span>{project}</span>
        <Tag className={'bg-[#F1F4F7]'} bordered={false}>
          {symbol}
        </Tag>
      </Flex>
    ),
  },
  {
    title: 'Current Price',
    dataIndex: 'currentPrice',
    key: 'price',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'Total Raise',
    dataIndex: 'totalRaised',
    key: 'raise',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'roi',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { roi }) => nFormatter(roi, 2, '$'),
  },
  {
    title: 'ATH ROI',
    dataIndex: 'athRoi',
    key: 'athRoi',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => nFormatter(value, 2, '$'),
  },
  {
    title: 'Launchpad',
    dataIndex: 'launchpads',
    key: 'launchpads',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (_, { launchpads, ido_platform_id }) => (
      <LaunchpadModal data={launchpads} platformId={ido_platform_id}>
        {({ onOpen }) => <DataGroup data={launchpads} onClick={onOpen} />}
      </LaunchpadModal>
    ),
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'start_date',
    sortIcon: renderSortIcon,
    sorter: true,
    render: (value) => formatDate(value),
  },
];

export const getIeoIdoCategoryLabel = (category: string) => {
  return (
    IeoIdoCategoryLabel[category] ||
    IeoIdoCategoryLabel[IeoIdoCategory.upcoming]
  );
};

export const getIeoIdoBreadcrumbs = (category: string, locale: string) => {
  return [
    {
      title: 'IDO/IEO',
      url: `/${locale}/ieo-ido/upcoming`,
    },
    {
      title: getIeoIdoCategoryLabel(category),
    },
  ];
};

export const getIeoIdoColumnsKey = (category: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return 'ido_ieo_upcoming';
    case IeoIdoCategory.ongoing:
      return 'ido_ieo_ongoing';
    case IeoIdoCategory.ended:
      return 'ido_ieo_ended';
    case IeoIdoCategory.topIeoLaunchpads:
      return 'ido_ieo_top_ieo_launch_pads';
    case IeoIdoCategory.topIdoLaunchpads:
      return 'ido_ieo_top_ido_launch_pads';
    case IeoIdoCategory.overview:
      return 'ido_ieo_upcoming_detail';
    default:
      return 'ido_ieo_upcoming';
  }
};

export const getIeoIdoColumnsDetailKey = (category?: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return 'ido_ieo_upcoming_detail';
    default:
      return 'ido_ieo_ended_detail';
  }
};

export const getIeoIdoColumnsDetail = (category?: string) => {
  switch (category) {
    case IeoIdoCategory.upcoming:
      return columnsUpcomingDetail;
    default:
      return columnsEndedDetail;
  }
};

export const getCategoryTags = (
  { isDetail }: { isDetail?: boolean } = { isDetail: false }
) => {
  if (isDetail) {
    return [
      {
        label: IeoIdoCategoryLabel.ended,
        value: IeoIdoCategory.ended,
        disabled: false,
      },
      {
        label: IeoIdoCategoryLabel.ongoing,
        value: IeoIdoCategory.ongoing,
        disabled: true,
      },
      {
        label: IeoIdoCategoryLabel.upcoming,
        value: IeoIdoCategory.upcoming,
        disabled: false,
      },
    ];
  }

  return Object.values(IeoIdoCategory).map((category) => ({
    label: IeoIdoCategoryLabel[category],
    value: category,
    disabled: TEMP_DISABLED_TAGS.includes(category),
  }));
};

export const getIeoIdoApiPath = (category: string) => {
  return IeoIdoApiPath[category] || IeoIdoApiPath[IeoIdoCategory.upcoming];
};

export const getIeoIdoApiSearchPath = (category: string) => {
  return (
    IeoIdoApiSearchPath[category] ||
    IeoIdoApiSearchPath[IeoIdoCategory.upcoming]
  );
};

export const getIconLink = (type: string) => {
  const icons: { [key: string]: ReactNode } = {
    web: <IconWeb />,
    twitter: <IconTwitter />,
    telegram: <IconTelegram />,
    gitbook: <IconFile />,
    medium: <IconMedium />,
    github: <IconGithub />,
    discord: <IconDiscord />,
    facebook: <IconFacebook />,
    linkedin: <IconLinkedIn />,
    youtube: <IconYoutube width={28} height={28} />,
    whitepaper: null,
    announcement: null,
  };

  return icons[type];
};

export const colorChart = [
  COLOR_CHART.BITTER_LEMON,
  COLOR_CHART.MALACHITE,
  COLOR_CHART.PAOLO_VERONESE_GREEN,
  COLOR_CHART.TURQUOISE_SURF,
  COLOR_CHART.CERULEAN_FROST,
  COLOR_CHART.PLUMP_PURPLE,
  COLOR_CHART.PURPUREUS,
  COLOR_CHART.JAZZBERRY_JAM,
  COLOR_CHART.CERISE,
  COLOR_CHART.SUNSET_ORANGE,
];
