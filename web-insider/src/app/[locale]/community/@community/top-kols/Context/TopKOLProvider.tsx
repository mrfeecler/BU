'use client';
import { GetKOLs } from '@/usecases/community';
import { FC, ReactNode, memo, useEffect, useState } from 'react';
import TopKOLContext, { TTopKOLData, TTopKOLFilter } from './TopKOLContext';

const initFilter = {
  page: 1,
  limit: 50,
};

type TTopKOLProvider = {
  defaultData: { data: TTopKOLData[]; total: number };
  children: ReactNode;
};
const TopKOLProvider: FC<TTopKOLProvider> = ({ children, defaultData }) => {
  const [flag, setFlag] = useState(false);
  const [filter, setFilter] = useState<TTopKOLFilter>(initFilter);
  const [dataTable, setDataTable] = useState<{
    data: TTopKOLData[];
    total: number;
    loading: boolean;
  }>({
    data: defaultData.data,
    total: defaultData.total,
    loading: false,
  });

  const handleRefetch = async () => {
    setDataTable((prev) => ({ ...prev, loading: true }));
    try {
      const res = await GetKOLs(filter);
      setDataTable({ ...res, loading: false });
    } catch {
      setDataTable((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleFilter = (filter: Partial<TTopKOLFilter> = initFilter) => {
    setFilter((prev) => ({ ...prev, ...filter }));
    if (!flag) setFlag(true);
  };

  useEffect(() => {
    if (flag) handleRefetch();
  }, [filter, flag]);

  return (
    <TopKOLContext.Provider
      value={{
        ...dataTable,
        filter,
        handleFilter,
      }}
    >
      {children}
    </TopKOLContext.Provider>
  );
};

export default memo(TopKOLProvider);
