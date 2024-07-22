'use client';
import { CoreTable } from '@/components/core-table';
import { ORDER, SOCKET_EVENTS } from '@/helpers/constants';
import { useDataSocket } from '@/hooks/useDataSocket';
import { IPagingParams } from '@/models/IPaging';
import { IResponseAxios } from '@/models/IResponse';
import { FetchIeoIdo, FetchLaunchPadProjects } from '@/usecases/ieo-ido';
import { isArray } from 'lodash';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import {
  IeoIdoCategory,
  IeoIdoStatus,
  getIeoIdoApiPath,
  getIeoIdoColumnsDetailKey,
  getIeoIdoColumnsKey,
} from '../../config';
import { IIeoIdoData, IIeoIdoFilterType } from '../../types';
import HeadFilter from '../head-filter';
import HeadFilterInformation from '../head-filter-information';
import './styles.scss';

interface PageParams extends Params {
  category: string;
  locale: string;
  slug?: string[];
}

const IeoIdoTable = ({ dataSSR }: any) => {
  const { data: dataSocket, setDefaultData } = useDataSocket<IIeoIdoData[]>(
    SOCKET_EVENTS.coinChange,
    {
      price: 'price',
    }
  );

  const params = useParams<PageParams>();
  const { category: _category = IeoIdoCategory.upcoming, slug } = params;
  const category = slug ? slug[1] || IeoIdoCategory.ended : _category;

  const [data, setData] = useState<IIeoIdoData[]>([]);
  const [total, setTotal] = useState(0);
  const [is_hot, setIsHot] = useState('all');
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 20,
  });

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const handleResponse = (res: any) => {
    const { data, total, page } = res;
    data.forEach((e: any) => {
      Object.keys(e).forEach((o) => {
        if (typeof e[o] == null) {
          e[o] = '-';
        }
      });
      e['page'] = page;
    });
    if (category === 'ended') setDefaultData(data);
    else setData(data);
    setTotal(total!!);
  };

  const getIeoIdoUpComing = useCallback(
    async (filter: IIeoIdoFilterType = {}) => {
      const _params: { [key: string]: string | number | string[] } = {
        limit: pagingParams.pageSize,
        page: pagingParams.page,
        sort_by: order.order ? order.columnKey : '',
        sort_order: ORDER[order.order] || 'desc',
        status: IeoIdoStatus[category] || '',
        is_hot,
        ...filter,
      };

      if (slug) {
        _params.key = slug[0];
      }

      const response: IResponseAxios<IIeoIdoData> = slug
        ? await FetchLaunchPadProjects(_params)
        : await FetchIeoIdo(getIeoIdoApiPath(category), _params);

      if (!response) return;
      handleResponse(response);
    },
    [pagingParams, order, category, is_hot]
  );

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  const renderHeader = () => {
    return slug ? (
      <HeadFilterInformation onFilter={getIeoIdoUpComing} />
    ) : (
      <HeadFilter
        onFilter={getIeoIdoUpComing}
        params={params}
        setHost={setIsHot}
      />
    );
  };

  const getColumnsKey = () => {
    return slug
      ? getIeoIdoColumnsDetailKey(category)
      : getIeoIdoColumnsKey(category);
  };

  useEffect(() => {
    getIeoIdoUpComing();
  }, [getIeoIdoUpComing]);

  // useEffect(() => {
  //   if (dataSSR.data.length > 0 && data.length === 0) {
  //     handleResponse(dataSSR);
  //   }
  // }, [dataSSR, data]);

  return (
    <CoreTable
      className='p-6 rounded-lg shadow-[0px_0px_16px_0px_#33374714]'
      renderHeader={renderHeader}
      data={(!!data.length ? data : dataSocket) || []}
      type={getColumnsKey()}
      onChange={handleOnChange}
      pageSize={pagingParams.pageSize}
      currentPage={pagingParams.page}
      total={total}
      // onChangePage={_onChangePage}
      // onChangeSize={_onChangeSize}
      onRow={() => ({
        className: 'h-[85px]',
      })}
      onChangePagingParams={setPagingParams}
    />
  );
};

export default IeoIdoTable;
