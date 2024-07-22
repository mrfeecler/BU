import CommonTable from '@/components/CommonTable/common-table';
import SelectItemTable from '@/components/SelectItemTable';
import Text from '@/components/Text';
import { getIndexTable, percentFormat } from '@/helpers';
import { ORDER } from '@/helpers/constants';
import { changeImageUrl, cn } from '@/helpers/functions';
import { IResponseAxios } from '@/models/IResponse';
import { FetchCategoryCoins } from '@/usecases/category';
import { Flex, Pagination, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isArray } from 'lodash';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { currencyFormat } from '../../../../../../helpers/index';
import { CategoryCoinsFilterType, CategoryCoinsType } from '../../types';
import HeadFilter from '../HeadFilter';

export default function CategoryTable() {
  const params = useParams<{ locale: string; id: string }>();
  const categoryId = params.id;

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const [total, setTotal] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });
  const [filter, setFilter] = useState<CategoryCoinsFilterType>();

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _onFilter = (filter: CategoryCoinsFilterType) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <Text>
        {start} - {end} from {total}
      </Text>
    );
  };

  const getCategoryCoins = useCallback(async () => {
    const _params: CategoryCoinsFilterType = {
      category_id: categoryId,
      limit: pageSize,
      page: currentPage,
      sort_by: order.order ? order.columnKey : '',
      sort_order: ORDER[order.order],
      slug: slug || '',
      ...filter,
    };

    const response: IResponseAxios<CategoryCoinsType> =
      await FetchCategoryCoins(_params);

    if (!response) return;
    const { data, total } = response;
    setData(data);
    setTotal(total!!);
  }, [pageSize, currentPage, order, categoryId, filter]);

  const categoryColumns: ColumnsType<CategoryCoinsType> = [
    {
      title: '#',
      width: 24,
      dataIndex: 'id',
      key: 'marketCap',
      sorter: true,
      align: 'left',
      fixed: true,
      render: (_, record) => (
        <Text weight='semiBold'>
          {order.columnKey == 'marketCap' && ORDER[order.order] == 'desc'
            ? total - record._index
            : record._index}
        </Text>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      fixed: true,
      width: 216,
      render: (_, { name, image, symbol, key }) => (
        <Flex align={'center'} gap={8} className='max-w-[216px]'>
          <img
            src={changeImageUrl(image.icon)}
            alt={'icon'}
            width={24}
            height={24}
          />
          <Flex align='center' gap={4}>
            <Link href={`/en/detail/${key}`} className='max-w-[160px]'>
              <Text weight='bold' hoverColor='primary' ellipsis>
                {name}
              </Text>
            </Link>
            <Tag bordered={false} className={cn('!bg-[#F1F4F7]')}>
              <Text size={12} type='secondary'>
                {symbol}
              </Text>
            </Tag>
          </Flex>
        </Flex>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      width: 120,
      align: 'right',
      render: (price) => {
        return (
          <Text weight='semiBold'>{currencyFormat(price, '$') || '-'}</Text>
        );
      },
    },
    {
      title: '24h %',
      dataIndex: 'priceChangeIn24h',
      width: 120,
      sorter: true,
      key: 'priceChangeIn24h',
      align: 'right',
      render: (value) => (
        <Text weight='semiBold' noChildrenStyle>
          {percentFormat(value, undefined, {
            precision: 2,
          }) || '-'}
        </Text>
      ),
    },
    {
      title: 'Volume (24h)',
      dataIndex: 'volume24h',
      sorter: true,
      width: 120,
      key: 'volume24h',
      align: 'right',
      render: (volume) => (
        <Text weight='semiBold'>
          {currencyFormat(Number(volume), '$') || '-'}
        </Text>
      ),
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCap',
      width: 120,
      sorter: true,
      key: 'marketCap',
      align: 'right',
      render: (marketCap) => (
        <Text weight='semiBold'>
          {currencyFormat(Number(marketCap), '$') || '-'}
        </Text>
      ),
    },
    {
      title: 'Price Graph (7d)',
      dataIndex: 'chart',
      key: 'chart',
      width: 200,
      align: 'right',
      render: (value) => {
        try {
          if (!value) return null;
          return (
            <div className='flex items-center justify-end'>
              <img
                alt='chart'
                width={200}
                height={52}
                src={changeImageUrl(value)}
              />
            </div>
          );
        } catch (error) {
          return null;
        }
      },
    },
  ];

  const formattedData = useMemo(
    () =>
      data.map((item, index) => {
        return {
          ...item,
          _index: getIndexTable(currentPage || 1, pageSize || 10, index),
        };
      }),
    [data, currentPage, pageSize]
  );

  useEffect(() => {
    getCategoryCoins();
  }, [getCategoryCoins]);

  return (
    <div className='category-table container-shadow p-6'>
      <Flex vertical gap={24}>
        <HeadFilter onFilter={_onFilter} />
        <CommonTable
          columns={categoryColumns}
          dataSource={formattedData}
          pagination={false}
          className='overflow-x-auto overflow-y-hidden'
          onChange={(_page, _filter, sort) => {
            const itemSort = isArray(sort) ? sort[0] : sort;
            setOrder({
              columnKey: itemSort.columnKey
                ? itemSort.columnKey.toString()
                : '',
              order: itemSort.order ? itemSort.order.toString() : '',
            });
          }}
        />
        <div
          className={cn(
            'pt-6 flex items-center justify-center table-pagination',
            'pagination-mobile [&_.ant-pagination-item-active]:!bg-[#5766ff]',
            '[&_.ant-pagination-item-active]:!border-[#5766ff]',
            '[&_.ant-pagination-item-active]:!text-white'
          )}
        >
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
          />
        </div>
        <div className='pt-6 flex flex-wrap gap-6 items-center justify-between table-pagination'>
          <div>{_renderRange()}</div>
          <div
            className={cn(
              'pagination-desktop',
              '[&_.ant-pagination-item-active]:!bg-[#5766ff]',
              '[&_.ant-pagination-item-active]:!border-[#5766ff]',
              '[&_.ant-pagination-item-active>a]:!text-white'
            )}
          >
            <Pagination
              total={total}
              pageSize={pageSize}
              current={currentPage}
              onChange={_onChangePage}
              showSizeChanger={false}
            />
          </div>
          <div>
            <SelectItemTable
              pageSize={pageSize.toString()}
              onChange={_onChangeSize}
            />
          </div>
        </div>
      </Flex>
    </div>
  );
}
