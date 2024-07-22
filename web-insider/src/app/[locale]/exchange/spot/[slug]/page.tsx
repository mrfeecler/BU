'use client';

import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { Flex } from 'antd';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';

const DetailTabs = dynamic(
  () => import('./components/exchange-detail-table/tabs'),
  { ssr: false }
);
const CoinInformation = dynamic(
  () => import('./components/exchange-detail-overview'),
  { ssr: false }
);
const CoinTableInfo = dynamic(
  () => import('./components/exchange-detail-table'),
  { ssr: false }
);

type PageProps = {
  params: {
    locale: 'vi' | 'en';
    slug: string;
  };
};

export default function Detail({ params }: PageProps) {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const breadcrumbs = [
    {
      title: 'Exchanges',
      url: `/${params.locale}/exchange/spot`,
    },
    {
      title: 'Spot',
      url: `/${params.locale}/exchange/spot`,
    },
  ];

  useEffect(() => {
    handleBreadcrumb(breadcrumbs, {
      resetData: true,
    });
  }, []);

  return (
    <Page>
      <Flex vertical>
        <CoinInformation />
        <Flex className='box-shadow-common rounded-lg p-6' vertical gap={16}>
          <DetailTabs />
          <CoinTableInfo />
        </Flex>
      </Flex>
    </Page>
  );
}
