import { FetchUpComings } from '@/usecases/home';
import { useEffect, useState } from 'react';
import './style.scss';

import { CoreTable } from '@/components/core-table';
import { ORDER } from '@/helpers/constants';
import { IPagingParams } from '@/models/IPaging';
import { isArray } from 'lodash';
import { useDebounce } from 'usehooks-ts';

const UpComing = () => {
  // const [pageSize, setPageSize] = useState(50);
  // const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [upcomings, setUpComings] = useState([]);

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 20,
  });

  function getUpComings(params: any) {
    FetchUpComings(params).then((res: any) => {
      setUpComings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getUpComings({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.order ? order.columnKey : '',
      search_key: debouncedValue.join(','),
      status: 'upcoming',
    });
  }, [pagingParams, order, debouncedValue]);

  // const _onChangePage = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const _onChangeSize = (value: number) => {
  //   setCurrentPage(1);
  //   setPageSize(value);
  // };

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  return (
    <CoreTable
      className={'md:p-6'}
      data={upcomings}
      type={'home_upcoming'}
      onChange={handleOnChange}
      pageSize={pagingParams.pageSize}
      currentPage={pagingParams.page}
      onChangePagingParams={setPagingParams}
      total={total}
      orderDirection={order.order}
      orderBy={order.columnKey === 'start_date' ? '#' : ''}
      onChangeFilterSelect={setKeyFilter}
    />
  );
};

export default UpComing;
