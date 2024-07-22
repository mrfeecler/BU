'use client';
import BaseTable from '@/components/BaseTable';
import { getIndexTable } from '@/helpers';
import { ORDER } from '@/helpers/constants';
import { IPagingParams } from '@/models/IPaging';
import { IResponseAxios } from '@/models/IResponse';
import { FetchFundraising } from '@/usecases/fundraising';
import { Flex } from 'antd';
import { isArray } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { getColumnsFundraising, getFundraisingPathApi } from '../../config';
import HeadFilter from '../head-filter';
import './styles.scss';

export default function FunDTable() {
  const params = useParams<{ locale: string; category: string }>();

  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 50,
  });
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 500);

  const formattedData = useMemo(
    () =>
      data.map((item, index) => {
        return {
          ...item,
          _index: getIndexTable(
            pagingParams.page || 1,
            pagingParams.pageSize || 10,
            index
          ),
        };
      }),
    [pagingParams, data]
  );

  const columns = getColumnsFundraising(params.category);

  const getTopbacker = useCallback(async () => {
    const url = getFundraisingPathApi(params.category);
    const response: IResponseAxios<any> = await FetchFundraising(url, {
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_by: order.order ? order.columnKey : '',
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: debouncedValue.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);
  }, [pagingParams, order, params.category, debouncedValue]);

  useEffect(() => {
    getTopbacker();
  }, [getTopbacker]);

  const _onChangeFilter = (keys: string[]) => {
    setKeyFilter(keys);
    setPagingParams({ ...pagingParams, page: 1 });
  };

  return (
    <Flex
      vertical
      gap={16}
      className='p-6 rounded-lg shadow-[0px_0px_16px_0px_#33374714]'
    >
      <HeadFilter layout={params.category} onChange={_onChangeFilter} />
      <BaseTable
        columns={columns}
        data={formattedData}
        pageSize={pagingParams.pageSize}
        currentPage={pagingParams.page}
        total={total}
        onChangePagingParams={setPagingParams}
        showSorterTooltip={false}
        onChange={(_page: any, _filter: any, sort: any[]) => {
          const itemSort = isArray(sort) ? sort[0] : sort;
          setOrder({
            columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
            order: itemSort.order ? itemSort.order.toString() : '',
          });
        }}
      />
    </Flex>
  );
}
