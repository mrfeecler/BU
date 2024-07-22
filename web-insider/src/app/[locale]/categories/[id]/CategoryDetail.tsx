'use client';
import { useContext, useEffect, useState } from 'react';

import BreadcrumbContext from '@/context/Breadcrumb/BreadcrumbContext';
import { TIME_FILTER } from '@/helpers/constants';
import { FetchCategoryDetail } from '@/usecases/category';
import { Flex } from 'antd';
import { useSearchParams } from 'next/navigation';
import CategoryOverview from './components/category-overview';
import CategoryTable from './components/category-table';
import './styles.scss';
type PageProps = {
  params: {
    id: string;
  };
};

export default function CategoryDetail(props: PageProps) {
  const params = useSearchParams();
  const slug = params.get('slug');

  const [category, setCategory] = useState<any>({});

  const { handleBreadcrumb } = useContext(BreadcrumbContext);

  const getCategoryDetail = async ({
    time = TIME_FILTER['24H'],
  }: {
    time?: TIME_FILTER;
  } = {}) => {
    const response: any = await FetchCategoryDetail({
      id: props.params.id,
      time,
      slug,
    });
    if (response.name) handleBreadcrumb([{ title: response.name }]);
    setCategory(response);
  };

  useEffect(() => {
    getCategoryDetail();
  }, [props.params]);

  return (
    <Flex vertical gap={24}>
      <CategoryOverview onFilter={getCategoryDetail} category={category} />
      <CategoryTable />
    </Flex>
  );
}
