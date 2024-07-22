'use client';
import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { useContext, useEffect } from 'react';
import IeoIdoTable from './components/ieo-ido-table';
import { getIeoIdoBreadcrumbs } from './config';
import './index.scss';

type PageProps = {
  params: {
    category: string;
    locale: 'vi' | 'en';
  };
};

const IeoIdoPage = ({ params }: PageProps) => {
  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  // try {
  //   const data: any = await FetchIeoIdo(getIeoIdoApiPath(params.category), {
  //     limit: 50,
  //     page: 1,
  //     sort_order: 'desc',
  //     is_hot: 'all',
  //   });

  //   return (
  //     <Page breadcrumbs={breadcrumbs}>
  //       <IeoIdoTable dataSSR={data} />
  //     </Page>
  //   );
  // } catch (error) {
  //   return <h1>Internal Server Error</h1>;
  // }

  useEffect(() => {
    handleBreadcrumb(getIeoIdoBreadcrumbs(params.category, params.locale), {
      resetData: true,
    });
  }, [params]);

  return (
    <Page>
      <IeoIdoTable />
    </Page>
  );
};

export default IeoIdoPage;
