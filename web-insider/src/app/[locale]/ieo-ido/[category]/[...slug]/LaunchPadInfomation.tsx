'use client';

import { Page } from '@/components/page';
import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { TopIdoLaunchPadDetail } from '@/usecases/ieo-ido';
import { Flex } from 'antd';
import { useLocale } from 'next-intl';
import { useContext, useEffect, useState } from 'react';
import CategoryOverview from '../components/category-overview';
import IeoIdoTable from '../components/ieo-ido-table';
import TierSystem from '../components/tier-system';
import { getIeoIdoBreadcrumbs } from '../config';
import { LaunchPadInfomationType } from '../types';
import CoinInformation from './coinInfo';

type PropsType = {
  category: string;
  slug: string[];
};

const LaunchPadInfomation = (props: PropsType) => {
  const locale = useLocale();
  const [data, setData] = useState<LaunchPadInfomationType>();

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const breadcrumbs = (name: string) => [
    ...getIeoIdoBreadcrumbs(props.category, locale).map((item) => {
      if (!item.url)
        return {
          ...item,
          url: `/${locale}/ieo-ido/${props.category}`,
        };
      return item;
    }),
    { title: name },
  ];

  const getData = async () => {
    const data: any = await TopIdoLaunchPadDetail({
      key: props.slug[0],
      time: '24h',
    });
    handleBreadcrumb(breadcrumbs(data.name), { resetData: true });
    setData(data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Page>
      <Flex vertical gap={12}>
        <CoinInformation info={data} />

        <CategoryOverview info={data} />

        <TierSystem />

        <IeoIdoTable />
      </Flex>
    </Page>
  );
};

export default LaunchPadInfomation;
