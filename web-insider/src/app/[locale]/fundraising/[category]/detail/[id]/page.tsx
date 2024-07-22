'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { useContext, useEffect } from 'react';
import { getBreadcrumbDetailConfig } from '../../config';
import './index.scss';
import Main from './main';

type PageProps = {
  params: {
    locale: 'vi' | 'en';
    id: string;
    category: string;
  };
  searchParams: any;
};

export default function FundraisingDetail(props: PageProps) {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(() => {
    handleBreadcrumb(
      getBreadcrumbDetailConfig(props?.params?.category, props?.params?.locale),
      {
        resetData: true,
      }
    );
  }, []);

  return (
    <Page contentClassnames='pt-4 pb-3'>
      <Main params={props?.params} />
    </Page>
  );
}
