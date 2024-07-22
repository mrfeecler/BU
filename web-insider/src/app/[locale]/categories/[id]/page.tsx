'use client';

import { Page } from '@/components/page';

import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { useContext, useEffect } from 'react';
import './styles.scss';
type PageProps = {
  params: {
    id: string;
  };
};

const CategoryDetail = dynamic(() => import('./CategoryDetail'), {
  ssr: false,
});

export default function CategoryPage(props: PageProps) {
  const locale = useLocale();

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const initBreadcrumbs = [
    {
      title: 'Categories',
      url: `/${locale}?tab=categories`,
    },
  ];

  useEffect(() => {
    handleBreadcrumb(initBreadcrumbs, { resetData: true });
  }, []);

  return (
    <Page>
      <CategoryDetail {...props} />
    </Page>
  );
}
