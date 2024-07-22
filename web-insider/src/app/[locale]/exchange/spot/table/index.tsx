'use client';

import BaseTable from '@/components/BaseTable';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import Text from '@/components/Text';
import { nFormatter, percentFormat, renderSortIcon } from '@/helpers';
import { COLOR_CHART, ORDER } from '@/helpers/constants';
import { changeImageUrl } from '@/helpers/functions';
import { IPagingParams } from '@/models/IPaging';
import { FetchList, SearchCoinsInFilter } from '@/usecases/exchange';
import { Checkbox, Flex, Select, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ReactECharts from 'echarts-for-react';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { IExchangeSpot, ISearchFilter } from '../props';
import './style.scss';

const ExchangeTable = () => {
  const columns: ColumnsType<IExchangeSpot> = [
    {
      key: 'id',
      title: '#',
      width: 50,
      align: 'left',
      fixed: true,
      render: (_, value, index) => {
        return (
          <Text weight='semiBold'>
            {(pagingParams.page - 1) * pagingParams.pageSize + index + 1}
          </Text>
        );
      },
    },
    {
      key: 'name',
      title: 'Name',
      width: 294,
      align: 'left',
      fixed: true,
      render: (_, value) => {
        return (
          <span className='table-header'>
            <Link href={`spot/${value.key2}`}>
              <Flex align='center' gap={8}>
                {value?.icon ? (
                  <img
                    src={changeImageUrl(value.icon)}
                    alt={value.name}
                    className='w-8 h-8'
                  />
                ) : (
                  ''
                )}
                <Text weight='bold' maxWidth={294} ellipsis>
                  {value.name}
                </Text>
              </Flex>
            </Link>
          </span>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
    {
      key: 'tier',
      title: 'Tier',
      dataIndex: 'tier',
      width: 50,
      align: 'right',
      sorter: true,
      render: (_, value) => {
        return <Text weight='semiBold'>{value?.tier || '-'}</Text>;
      },
    },
    {
      key: 'volume24h',
      title: 'Volume (24h)',
      dataIndex: 'volume24h',
      width: 128,
      align: 'right',
      sorter: true,
      render: (_, value) => {
        return (
          <Flex vertical>
            <Text weight='semiBold'>
              {value?.volume24h ? nFormatter(value?.volume24h, 2, '$') : '-'}
            </Text>
            <Text weight='bold' noChildrenStyle>
              {value?.volumn24hPercent
                ? percentFormat(value?.volumn24hPercent, 'text-sm font-bold')
                : null}
            </Text>
          </Flex>
        );
      },
      sortIcon: renderSortIcon,
    },
    {
      key: 'currenciesCount',
      title: 'Coins',
      width: 96,
      align: 'right',
      render: (_, value) => {
        return <Text weight='semiBold'>{value?.currenciesCount || '-'}</Text>;
      },
      sorter: true,
      sortIcon: renderSortIcon,
    },
    {
      key: 'country',
      title: 'Country',
      width: 130,
      align: 'center',
      sorter: true,
      render: (_, value: any) => {
        return value?.country ? (
          <div className='flex justify-center items-center'>
            <Tooltip
              placement='top'
              title={<Text size={12}>{value?.country}</Text>}
              trigger={'hover'}
              overlayClassName='tooltip-light'
            >
              <img
                className='w-8 h-4.5'
                src={`/Flag/Country=${value?.country}, Style=Flag, Radius=Off.svg`}
              />
            </Tooltip>
          </div>
        ) : (
          <div className='text-grey-700'>-</div>
        );
      },
    },
    {
      key: 'percentVolume',
      title: 'Market Share',
      dataIndex: 'marketShare',
      width: 148,
      align: 'left',
      sorter: true,
      render: (_, value) => {
        return (
          <div className='flex items-center gap-2'>
            <ReactECharts
              style={{
                height: 40,
                width: 40,
              }}
              option={{
                option: {
                  tooltips: { enabled: false },
                  hover: { mode: null },
                },
                grid: {
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      show: false,
                      position: 'center',
                    },
                    labelLine: {
                      show: false,
                    },
                    emphasis: {
                      focus: false,
                      scale: false,
                    },
                    data: [
                      {
                        value: value.percentVolume,
                        name: 'Gainers',
                        itemStyle: {
                          color: COLOR_CHART.CRAYOLA,
                        },
                      },
                      {
                        value: 100 - value.percentVolume,
                        name: 'losers',
                        itemStyle: {
                          color: COLOR_CHART.RADICAL_RED,
                        },
                      },
                    ],
                  },
                ],
              }}
            />
            <Text weight='semiBold'>{value.percentVolume}%</Text>
          </div>
        );
      },
    },
    {
      key: 'graph',
      title: 'Volume Graph (7d)',
      dataIndex: 'graph',
      width: 162,
      align: 'right',
      sorter: false,
      render: (_, value) => {
        try {
          return (
            <div className='flex items-center justify-end relative'>
              <ReactECharts
                option={{
                  title: {
                    show: false,
                  },
                  xAxis: {
                    type: 'category',
                    show: false,
                  },
                  yAxis: {
                    type: 'value',
                    show: false,
                  },
                  grid: {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                  },
                  series: [
                    {
                      data: value.dataChart.volumes,
                      type: 'line',
                      areaStyle: {
                        color: {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color:
                                value.dataChart.volumes[99] -
                                  value.dataChart.volumes[0] <
                                0
                                  ? 'rgba(255, 0, 0, 0.5)'
                                  : 'rgba(0, 128, 0, 0.5)',
                            },
                            {
                              offset: 1,
                              color:
                                value.dataChart.volumes[99] -
                                  value.dataChart.volumes[0] <
                                0
                                  ? 'rgba(255, 0, 0, 0)'
                                  : 'rgba(0, 128, 0, 0)',
                            }, // Điểm cuối gradient color
                          ],
                        },
                      },
                      lineStyle: {
                        color:
                          value.dataChart.volumes[99] -
                            value.dataChart.volumes[0] <
                          0
                            ? 'rgba(255, 0, 0, 0.5)'
                            : 'rgba(0, 128, 0, 0.5)', // Màu xanh lá cây cho đường line
                      },
                      showSymbol: false,
                    },
                  ],
                }}
                style={{ width: '240px', height: '62px' }}
              />
            </div>
          );
        } catch (error) {
          return null;
        }
      },
    },
  ];
  const [data, setData] = useState<IExchangeSpot[]>([]);
  const [total, setTotal] = useState(999);
  const [order, setOrder] = useState({
    columnKey: 'volume24h',
    order: 'descend',
  });
  const [keyFilter, setKeyFilter] = useState<string[]>([]);
  const debouncedValue = useDebounce<string[]>(keyFilter, 300);
  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 50,
  });

  const getCoins = async () => {
    const response: any = await FetchList({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_by: order.order ? order.columnKey : '',
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: keyFilter.join(','),
    });

    if (!response) return;
    const { data, total } = response;
    if (data && data.length > 0) {
      const dataClone = data.map((item: any, index: number) => ({
        ...item,
        key2: item.key,
        key: index,
      }));
      setData(dataClone);
    } else {
      setData(data);
    }
    setTotal(total!!);

    /* #endregion */
  };

  useEffect(() => {
    getCoins();
  }, [pagingParams, order, debouncedValue]);

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 2) return <></>;

    if (index === 2)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SearchCoinsInFilter({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: ISearchFilter) => ({
      id: e.key,
      name: e.name,
      code: e.key,
      thumb: '',
      isSelected: false,
      symbol: e.symbol,
    }));
  };

  const _renderOption = ({ name, code, checked, symbol }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 py-1 justify-between'>
          <div className='flex gap-1 items-start'>
            <span
              style={{
                fontFamily: 'Plus Jakarta Sans Medium',
              }}
              className='name'
            >
              {name}
            </span>
            {symbol ? (
              <div
                style={{
                  fontFamily: 'Plus Jakarta Sans Medium',
                }}
                className='code px-[8px] rounded-[4px] bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-[12px] pt-[2px]'
              >
                {symbol}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className=''>
            {!checked ? <Checkbox className='custom-checkbox' /> : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _onSelectFilter = (value: string[]) => {
    setKeyFilter(value);
  };

  return (
    <div className='home-table coin-tab'>
      <div className='filter flex justify-between mb-4'>
        <div className='flex'>
          <FilterCustom
            placeholder='Filter exchanges'
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            // isSortSelected='alphabet'
            className='!font-jm'
          />
        </div>
      </div>
      <div className='table-price overflow-x-auto'>
        <BaseTable
          columns={columns}
          data={data}
          pageSize={pagingParams.pageSize}
          currentPage={pagingParams.page}
          total={total}
          onChangePagingParams={setPagingParams}
          pagination={{ position: ['none'], pageSize: pagingParams.pageSize }}
          onChange={(_page: any, _filter: any, sort: any[]) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey:
                itemSort.columnKey && itemSort.order
                  ? itemSort.columnKey.toString()
                  : 'volume24h',
              order: itemSort.order ? itemSort.order.toString() : 'descend',
            });
          }}
        />
      </div>
    </div>
  );
};
export default ExchangeTable;
