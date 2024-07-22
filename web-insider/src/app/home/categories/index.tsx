import { isArray } from 'lodash';
import { useEffect, useState } from 'react';

import { IResponseAxios } from '@/models/IResponse';
import { FetchCategories } from '@/usecases/home';

import { CoreTable } from '@/components/core-table';
import { ORDER } from '@/helpers/constants';
import { IPagingParams } from '@/models/IPaging';
import { useDebounce } from 'usehooks-ts';

const Categories = () => {
  // const [pageSize, setPageSize] = useState(50);
  // const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<IHomeCategory[]>([]);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 20,
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  useEffect(() => {
    _fetchCategories();
  }, [pagingParams, order, debouncedValue]);

  const _fetchCategories = async () => {
    const response: IResponseAxios<IHomeCategory> = await FetchCategories({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_by: order.order ? order.columnKey : '',
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });
    if (!response) return;
    const { data, total } = response;
    setTotal(total!!);
    setData(data);
  };

  // const _onChangePage = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const _onChangeSize = (value: number) => {
  //   setCurrentPage(1);
  //   setPageSize(value);
  // };

  const handleOnChange = (tableConfig: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  return (
    <CoreTable
      className={'md:p-6'}
      data={data}
      type={'home_categories'}
      onChange={handleOnChange}
      pageSize={pagingParams.pageSize}
      currentPage={pagingParams.page}
      onChangePagingParams={setPagingParams}
      total={total}
      onChangeFilterSelect={setKeyFilter}
    />
  );
};

export default Categories;
