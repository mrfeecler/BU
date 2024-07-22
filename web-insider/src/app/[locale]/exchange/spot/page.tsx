'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { Flex } from 'antd';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';

const ExchangeTabs = dynamic(() => import('./tabs'), { ssr: false });
const ExchangeTable = dynamic(() => import('./table'), { ssr: false });

export default function Exchange() {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const breadcrumbs = [
    {
      title: 'Exchanges',
    },
    {
      title: 'Spot',
    },
  ];

  useEffect(() => {
    handleBreadcrumb(breadcrumbs, { resetData: true });
  }, []);

  return (
    <Page>
      <Flex
        className='rounded-lg shadow-[0px_0px_16px_0px_#33374714] p-6'
        vertical
        gap={16}
      >
        <ExchangeTabs />
        <ExchangeTable />
      </Flex>
    </Page>
  );
}
