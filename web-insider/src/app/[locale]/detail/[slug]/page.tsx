'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import './index.scss';

const MainData = dynamic(() => import('../main-data/MainData'), { ssr: false });

export default function Detail(props: any) {
  const { params } = props;

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const breadcrumbs = [
    {
      title: 'Coins',
      url: `/${params.locale}?tab=all_coin`,
    },
  ];

  useEffect(() => {
    handleBreadcrumb(breadcrumbs, { resetData: true });
  }, []);

  return (
    <Page>
      <MainData slug={params.slug} />
    </Page>
  );
}
