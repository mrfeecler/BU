'use client';

import { Divider, Segmented } from 'antd';
import { useEffect, useState } from 'react';
import SelectMarket from './select-market/SelectMarket';

import Text from '@/components/Text';
import { CoreTable } from '@/components/core-table';
import { ORDER } from '@/helpers/constants';
import { cn } from '@/helpers/functions';
import { IPagingParams } from '@/models/IPaging';
import { FetchHistoricals, FetchSpot } from '@/usecases/coin-info';
import { SegmentedValue } from 'antd/es/segmented';
import { isArray } from 'lodash';
import BUDatePicker from './DatePicker';

const Markets = (props: any) => {
  const tabs = [
    {
      id: 1,
      label: 'Spot',
      enable: true,
    },
    {
      id: 2,
      label: 'Future',
      enable: false,
    },
    {
      type: 'divider',
    },
    {
      id: 3,
      label: 'Historical Data',
      enable: true,
    },
  ];
  const [active, setActive] = useState<number>(1);
  const activeTab = (id: number) => {
    if (id != 2) setActive(id);
  };

  return (
    <div className='fade-top box-shadow-common p-6'>
      <div className='flex items-center gap-4 mb-4 flex-wrap'>
        {tabs.map((tab, index) => {
          if (tab.type === 'divider')
            return (
              <Divider
                type='vertical'
                className='!h-10 !border-[1.5px] !border-[#9FA4B7] !m-0'
              />
            );
          return (
            <div
              key={index}
              onClick={() => activeTab(tab.id!)}
              className={cn(
                'w-auto h-auto rounded-xl py-3 px-5 gap-2 cursor-pointer text-xs md:text-sm ',
                tab.id === active
                  ? 'bg-gradient-to-b from-blue-500 to-indigo-900 text-white'
                  : 'border ',
                !tab.enable && 'cursor-not-allowed opacity-50'
              )}
            >
              <p>{tab?.label}</p>
            </div>
          );
        })}
      </div>
      {active == 1 && <Spot slug={props.slug} />}
      {active == 3 && <Historical slug={props.slug} />}
    </div>
  );
};

export function Historical(props: any) {
  // const _onChangePage = (page: number) => {
  //   setPage(page);
  // };

  // const _onChangeSize = (value: number) => {
  //   setPageSize(value);
  // };

  const [historicals, setHistoricals] = useState([]);
  // const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  // const [page, setPage] = useState(1);
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 10,
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  async function fetchHistoricals() {
    try {
      const res: any = await FetchHistoricals({
        coin_key: props.slug,
        limit: pagingParams.pageSize,
        page: pagingParams.page,
        date_from: dateFrom,
        date_to: dateTo,
        sort_by: order.order ? order.columnKey : '',
        sort_order: ORDER[order.order],
      });
      setTotal(res.total);
      setHistoricals(res.data);
    } catch (error) {
      return null;
    }
  }

  const handleOnChangeHistorials = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  useEffect(() => {
    fetchHistoricals();
  }, [pagingParams, dateFrom, dateTo, order]);

  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <BUDatePicker
          _onRangeDateChange={(from: any, to: any) => {
            setDateFrom(from);
            setDateTo(to);
            fetchHistoricals();
          }}
        />
      </div>

      <CoreTable
        data={historicals}
        type={'detail_market_historical'}
        onChange={handleOnChangeHistorials}
        pageSize={pagingParams.pageSize}
        currentPage={pagingParams.page}
        total={total}
        onChangePagingParams={setPagingParams}
        // onChangePage={_onChangePage}
        // onChangeSize={_onChangeSize}
        renderHeader={() => null}
      />
    </div>
  );
}

export function Spot(props: any) {
  // const _onChangePage = (page: number) => {
  //   setPage(page);
  // };

  // const _onChangeSize = (value: number) => {
  //   setPageSize(value);
  // };

  const _onChangeType = (value: SegmentedValue) => {
    setType(value.toString());
  };

  const [spots, setSpots] = useState([]);
  // const [pageSize, setPageSize] = useState(10);
  // const [page, setPage] = useState(1);
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 20,
  });
  const [type, setType] = useState('All');
  const [total, setTotal] = useState(0);
  const [searchKey, setSearchKey] = useState('');

  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  async function fetchSpots() {
    try {
      const res: any = await FetchSpot({
        coin_key: props.slug,
        limit: pagingParams.pageSize,
        page: pagingParams.page,
        type: type,
        search_key: searchKey,
        sort_by: order.order ? order.columnKey : '',
        sort_order: ORDER[order.order as keyof typeof ORDER],
      });
      setSpots(res.data);
      setTotal(res?.total);
    } catch (error) {
      setSpots([]);
      return [];
    }
  }

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  useEffect(() => {
    fetchSpots();
  }, [pagingParams, type, order, searchKey]);

  return (
    <div>
      <div className='flex items-center justify-between flex-wrap gap-4 mb-5'>
        <SelectMarket onChangeSearhKey={setSearchKey} slug={props.slug} />
        <div className='flex items-center justify-center w-full md:w-auto'>
          <Segmented
            value={type.toLowerCase()}
            onChange={_onChangeType}
            options={[
              {
                value: 'all',
                label: (
                  <Text
                    weight={
                      type.toLowerCase() === 'all' ? 'semiBold' : undefined
                    }
                    color={type.toLowerCase() === 'all' ? 'primary' : undefined}
                  >
                    All
                  </Text>
                ),
              },
              {
                value: 'cex',
                label: (
                  <Text
                    weight={
                      type.toLowerCase() === 'cex' ? 'semiBold' : undefined
                    }
                    color={type.toLowerCase() === 'cex' ? 'primary' : undefined}
                  >
                    CEX
                  </Text>
                ),
              },
              {
                value: 'dex',
                label: (
                  <Text
                    weight={
                      type.toLowerCase() === 'dex' ? 'semiBold' : undefined
                    }
                    color={type.toLowerCase() === 'dex' ? 'primary' : undefined}
                  >
                    DEX
                  </Text>
                ),
              },
            ]}
            className={cn(
              '!p-1 !bg-[#EEF2F6]',
              '[&_.ant-segmented-item-label]:!min-w-[70px]'
            )}
          />
        </div>
        <div className='w-full max-w-[280px]'></div>
      </div>
      <CoreTable
        data={spots}
        type={'detail_market_spot'}
        onChange={handleOnChange}
        pageSize={pagingParams.pageSize}
        currentPage={pagingParams.page}
        total={total}
        // onChangePage={_onChangePage}
        // onChangeSize={_onChangeSize}
        onChangePagingParams={setPagingParams}
        renderHeader={() => null}
      />
    </div>
  );
}

export default Markets;
