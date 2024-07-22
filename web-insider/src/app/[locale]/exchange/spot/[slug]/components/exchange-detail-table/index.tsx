'use client';

import FilterCustom from '@/components/FilterCustom';
import {
  currencyFormat,
  getIndexTable,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { Checkbox, Flex, Select, Tag as TagAntd } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import './index.scss';

import BaseTable from '@/components/BaseTable';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import Tag from '@/components/Tag';
import Text from '@/components/Text';
import { ORDER } from '@/helpers/constants';
import { changeImageUrl } from '@/helpers/functions';
import { IPagingParams } from '@/models/IPaging';
import { IResponseAxios } from '@/models/IResponse';
import {
  FetchInfomationCoin,
  FetchSpotList,
  SpotDetailSearch,
} from '@/usecases/exchange';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useDebounce } from 'usehooks-ts';
import { ICoinTable } from '../../props';

const CoinTableInfo = (props: any) => {
  const columns: ColumnsType<ICoinTable> = [
    {
      key: 'id',
      title: '#',
      width: 56,
      align: 'left',
      render: (_, record) => {
        return <Text weight='bold'>{record._index}</Text>;
      },
    },
    {
      key: 'name',
      title: 'Name',
      width: 248,
      align: 'left',
      render: (_, value) => {
        return (
          <span className='max-w-[248px]'>
            <Link
              target='_blank'
              href={
                value?.key2
                  ? `/${useLocale()}/detail/${value?.key2}?tab=markets`
                  : ''
              }
            >
              <Flex align='center'>
                {value?.logo ? (
                  <img
                    className='mr-2 h-8 w-8'
                    src={changeImageUrl(value.logo)}
                    alt={value.name}
                  />
                ) : (
                  ''
                )}
                <Flex align='center' gap={4}>
                  <Text weight='bold' hoverColor='primary'>
                    {value?.name || ''}
                  </Text>
                  {value?.ticker ? (
                    <Tag>
                      <Text type='secondary' size={12}>
                        {value?.ticker || ''}
                      </Text>
                    </Tag>
                  ) : (
                    ''
                  )}
                </Flex>
              </Flex>
            </Link>
          </span>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
    {
      key: 'pair',
      title: 'Pair',
      width: 199,
      align: 'right',
      sorter: true,
      sortIcon: renderSortIcon,
      render: (_, value) => {
        return <Text weight='semiBold'>{value?.pair}</Text>;
      },
    },
    {
      key: 'price',
      title: 'Price',
      width: 199,
      align: 'right',
      render: (_, value) => {
        return (
          <Text weight='semiBold'>{currencyFormat(value?.price, '$')}</Text>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
    {
      key: 'priceChangeIn24h',
      title: '24h %',
      width: 190,
      align: 'right',
      render: (_, value) => {
        return (
          <Text weight='semiBold'>
            {percentFormat(
              value?.priceChangeIn24h || 0,
              'text-sm font-semibold'
            )}
          </Text>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
    {
      key: 'volume',
      title: 'Volume (24h)',
      width: 169,
      align: 'right',
      render: (_, value) => {
        return (
          <Text weight='semiBold'>
            {value?.volume ? nFormatter(value?.volume, 2, '$') : '-'}
          </Text>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
    {
      key: 'volumeChangeIn24h',
      title: 'Volumn %',
      width: 152,
      align: 'right',
      render: (_, value) => {
        return (
          <Text weight='semiBold'>
            {percentFormat(
              value?.volumeChangeIn24h || 0,
              'text-sm font-semibold'
            ) || '-'}
          </Text>
        );
      },
      sortIcon: renderSortIcon,
      sorter: true,
    },
  ];
  const params = useParams<{ locale: string; slug: string }>();
  const [dataCoins, setDataCoins] = useState<ICoinTable[]>([]);
  const [total, setTotal] = useState(0);
  const [key] = useState(params.slug);
  const [isInitCoins, setIsInitCoins] = useState(true);
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
    getCoins();
  }, [pagingParams, order, debouncedValue]);

  const getCoins = async () => {
    if (isInitCoins) {
      const responses: any = await FetchInfomationCoin({ key: params.slug });
      const { spots } = responses;
      const dataClone = spots.data.map((item: any, index: number) => ({
        ...item,
        key2: item.key,
        key: index,
      }));
      setDataCoins(dataClone);
      setTotal(spots.total);
      setIsInitCoins(false);
    } else {
      const response: IResponseAxios<ICoinTable> = await FetchSpotList({
        key: key,
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
        setDataCoins(dataClone);
      } else {
        setDataCoins(data);
      }
      setTotal(total!!);
    }
  };

  // const _onChangePage = (page: number) => {
  //   setCurrentPage(page);
  // };

  // const _onChangeSize = (value: number) => {
  //   setCurrentPage(1);
  //   setPageSize(value);
  // };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    let displayValue = rawData.name;
    if (
      displayValue &&
      displayValue.includes('(') &&
      displayValue.includes(')')
    ) {
      displayValue = displayValue.substring(0, displayValue.indexOf('('));
    }

    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 3) return <></>;

    if (index === 3)
      return (
        <TagAntd color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </TagAntd>
      );
    return (
      <TagAntd
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {displayValue ?? value}
      </TagAntd>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await SpotDetailSearch({
      search_key: searchKey,
      key,
    });
    if (!res) return [];

    return res.map((e: any) => ({
      id: e.coinkey,
      name: e.coinname,
      code: e.coinkey,
      thumb: '',
      isSelected: false,
    }));
  };

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    let symbol = undefined;

    if (name && name.includes('(') && name.includes(')')) {
      symbol = name.substring(name.indexOf('(') + 1, name.indexOf(')'));
      name = name.substring(0, name.indexOf('('));
    }
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

  const formattedData = useMemo(
    () =>
      dataCoins.map((item, index) => {
        return {
          ...item,
          _index: getIndexTable(
            pagingParams.page || 1,
            pagingParams.pageSize || 10,
            index
          ),
        };
      }),
    [dataCoins]
  );

  return (
    <div className='home-table coin-tab'>
      <div className='filter flex justify-between my-4'>
        <div className='flex'>
          <FilterCustom
            placeholder='Filter coins'
            renderOption={_renderOption}
            renderTag={_renderTag}
            onChange={_onSelectFilter}
            getData={_getData}
            // isSortSelected='alphabet'
          />
        </div>
      </div>
      <div className='table-price overflow-x-auto'>
        <BaseTable
          columns={columns}
          data={formattedData}
          pageSize={pagingParams.pageSize}
          currentPage={pagingParams.page}
          total={total}
          // _onChangePage={_onChangePage}
          // _onChangeSize={_onChangeSize}
          onChangePagingParams={setPagingParams}
          pagination={{ position: ['none'], pageSize: pagingParams.pageSize }}
          onChange={(_page: any, _filter: any, sort: any[]) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
        />
      </div>
    </div>
  );
};
export default CoinTableInfo;
