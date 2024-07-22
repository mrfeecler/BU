'use client';

import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { FetchDetailBanker } from '@/usecases/fundraising';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { IBankerData } from '../../types';

const FundraisingDetailOverview = dynamic(
  () => import('./components/fundraising-detail-overview'),
  { ssr: false }
);
const FundraisingDetailTable = dynamic(
  () => import('./components/fundraising-detail-table'),
  { ssr: false }
);

const Main = ({ params }: any) => {
  const [data, setData] = useState<IBankerData | any>(null);

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const fetchDetail = async () => {
    try {
      const res: any = await FetchDetailBanker({
        backer_id: params.id,
      });
      if (res.name) handleBreadcrumb([{ title: res.name }]);
      setData(res);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [params.id]);

  return (
    <div>
      {data && (
        <>
          <FundraisingDetailOverview data={data} />
          <FundraisingDetailTable slug={data?.slug || ''} data={data} />
        </>
      )}
    </div>
  );
};

export default Main;
