'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { useContext, useEffect } from 'react';
import FunDTable from './components/fundraising-table';
import { FundraisingType, getBreadcrumbConfig } from './config';
import './index.scss';

type PageProps = {
  params: {
    category: FundraisingType;
    locale: 'vi' | 'en';
  };
};

export default function Fundraising({ params }: PageProps) {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(() => {
    handleBreadcrumb(getBreadcrumbConfig(params.category, params.locale), {
      resetData: true,
    });
  }, [params]);

  return (
    <Page>
      <FunDTable />
    </Page>
  );
}
