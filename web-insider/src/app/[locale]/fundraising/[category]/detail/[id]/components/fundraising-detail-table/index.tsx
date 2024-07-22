'use client';

import Text from '@/components/Text';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { cn } from '@/helpers/functions';
import { Button, Flex } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useContext, useEffect } from 'react';
import './styles.scss';
import TableData from './tableData';

const tabs = [
  {
    disable: false,
    label: 'Portfolio',
    key: 'por',
  },
  {
    disable: false,
    label: 'Funding Rounds',
    key: 'fun',
  },
  {
    disable: true,
    label: 'Co-Invesment',
    key: 'inv',
  },
  {
    disable: true,
    label: 'Upcoming IDO/IEO',
    key: 'upc',
  },
];

const FundraisingDetailTable = ({
  slug,
  data,
}: {
  slug: string;
  data?: any;
}) => {
  const params = useSearchParams();
  const router = useRouter();

  const tabUrl = params.get('tab') || 'por';

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const _renderTabs = () => {
    return tabs.map((tab) => (
      <Button
        key={tab.key}
        disabled={tab.disable}
        className={cn(tab.key === tabUrl && 'active')}
        onClick={() => {
          router.push(
            tab.key !== 'por'
              ? `/en/fundraising/top-backers/detail/${data?.id}?tab=${tab.key}`
              : `/en/fundraising/top-backers/detail/${data?.id}`
          );
        }}
      >
        <Text color='parent'>{tab.label}</Text>
      </Button>
    ));
  };

  useEffect(() => {
    if (tabUrl !== 'por')
      handleBreadcrumb(
        [
          {
            title: data?.name || '',
            url: `/en/fundraising/top-backers/detail/${data?.id}`,
          },
          {
            title: tabs.find((tab) => tab.key === tabUrl)?.label || '',
          },
        ],
        {
          holdData: 3,
        }
      );
    else
      handleBreadcrumb([{ title: data?.name || '' }], {
        holdData: 3,
      });
  }, [tabUrl]);

  return (
    <div className={cn('bg-white container-shadow')}>
      <Flex vertical gap={16} className='p-6 mt-6'>
        <Flex vertical gap={16} className='header-filter'>
          <Flex wrap='wrap' gap={16} className='header-filter__options'>
            {_renderTabs()}
          </Flex>
        </Flex>
        <TableData key={tabUrl} tabKey={tabUrl} slug={slug} />
      </Flex>
    </div>
  );
};

export default memo(FundraisingDetailTable);
