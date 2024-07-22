import { GetKOLs } from '@/usecases/community';
import { Flex } from 'antd';
import { FC, memo } from 'react';
import TopKOLProvider from './Context/TopKOLProvider';
import Filter from './Filter';
import Table from './Table';

type TTopKOL = {
  params: any;
};
const TopKOL: FC<TTopKOL> = async () => {
  const res = await GetKOLs({
    page: 1,
    limit: 50,
  });

  return (
    <Flex vertical gap={16}>
      <TopKOLProvider defaultData={res}>
        <Filter />
        <Table />
      </TopKOLProvider>
    </Flex>
  );
};

export default memo(TopKOL);
