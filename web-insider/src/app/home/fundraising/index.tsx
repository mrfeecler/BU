import { ORDER } from '@/helpers/constants';
import { FetchFundraisings } from '@/usecases/home';
import { isArray } from 'lodash';
import { useEffect, useState } from 'react';
import './style.scss';

import { CoreTable } from '@/components/core-table';
import { IPagingParams } from '@/models/IPaging';
import { useDebounce } from 'usehooks-ts';

const Fundraising = () => {
  const [fundraisings, setFundraisings] = useState([]);
  // const [pageSize, setPageSize] = useState(50);
  // const [currentPage, setCurrentPage] = useState(1);
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

  function getFundraisings(params: any) {
    FetchFundraisings(params).then((res: any) => {
      setFundraisings(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getFundraisings({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.order ? order.columnKey : '',
      search_key: debouncedValue.join(','),
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
      data={fundraisings}
      type={'home_fundraising'}
      onChange={handleOnChange}
      pageSize={pagingParams.pageSize}
      currentPage={pagingParams.page}
      onChangePagingParams={setPagingParams}
      total={total}
      onChangeFilterSelect={setKeyFilter}
      isCustomize={false}
      isFilter={false}
    />
  );
};

export default Fundraising;
