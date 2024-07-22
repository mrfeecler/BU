'use client';

import LaunchpadModal from '@/app/[locale]/fundraising/[category]/components/launchpad-modal';
import CommonTable from '@/components/CommonTable/common-table';
import DataGroup from '@/components/DataGroup';
import SelectItemTable from '@/components/SelectItemTable';
import Text from '@/components/Text';
import {
  currencyFormat,
  nFormatter,
  percentFormat,
  renderSortIcon,
} from '@/helpers';
import { ORDER, SOCKET_EVENTS } from '@/helpers/constants';
import { changeImageUrl } from '@/helpers/functions';
import { useDataSocket } from '@/hooks/useDataSocket';
import { IResponseAxios } from '@/models/IResponse';
import { FetchTokenUnlock } from '@/usecases/token-unlock';
import { Modal, Pagination } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { isArray, round } from 'lodash';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { IUnlock, Launchpad } from '../../types';
import NextUnlock from '../nextUnlock';
import { UsHeader } from './us-header';

export default function UsTable() {
  const { data, setDefaultData } = useDataSocket<IUnlock[]>(
    SOCKET_EVENTS.coinChange,
    {
      price: 'price',
      percent_change_24h: 'priceChangeIn24h',
      market_cap: 'marketCap',
    }
  );

  const columns: ColumnsType<IUnlock> = [
    {
      key: 'id',
      title: '#',
      width: 24,
      align: 'left',
      fixed: true,
      render: (_, value, index) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      fixed: true,
      width: 168,
      sortIcon: renderSortIcon,
      sorter: true,
      render: (_, value) => {
        return (
          <Link
            href={`/en/detail/${value.key}?tab=unlock`}
            className='flex gap-2 items-center max-w-[168px]'
          >
            {value.image ? (
              <img
                src={changeImageUrl(value.image)}
                alt={'icon'}
                width={32}
                height={32}
              />
            ) : (
              ''
            )}
            <Text weight='bold' ellipsis>
              {value.name}
            </Text>
            <div className={'bg-grey-200 rounded px-2'}>
              <span className='text-grey-500 text-xs font-medium font-jm'>
                {value.symbol}
              </span>
            </div>
          </Link>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      width: 88,
      sortIcon: renderSortIcon,
      sorter: true,
      render: (_, { price, priceChangeIn24h }) => {
        return (
          <div className='text-right'>
            <div className='text-sm text-grey-700 font-semibold font-jsb'>
              {currencyFormat(Number(price), '$')}
            </div>
            <div className='font-bold font-jb text-sm'>
              {priceChangeIn24h ? percentFormat(priceChangeIn24h) : '-'}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Market Cap',
      dataIndex: 'marketCap',
      key: 'marketCap',
      sortIcon: renderSortIcon,
      sorter: true,
      width: 92,
      align: 'right',
      render: (value) => {
        return (
          <div className='text-grey-700 text-sm font-semibold font-jsb text-right'>
            {nFormatter(value, 2, '$')}
          </div>
        );
      },
    },

    {
      title: 'Launchpad',
      dataIndex: 'launchpadList',
      key: 'launchpads',
      align: 'left',
      sortIcon: renderSortIcon,
      width: 156,
      sorter: true,
      render: (_, { launchpads }) => {
        if (!launchpads || launchpads.length == 0) return '-';
        const launchpad = launchpads.map((e: any) => ({
          ...e,
          avatarUrl: e.image,
        }));
        return (
          <LaunchpadModal data={launchpad}>
            {({ onOpen }) => (
              <DataGroup data={launchpad} onClick={onOpen} hasClickName />
            )}
          </LaunchpadModal>
        );
      },
    },
    {
      title: 'IDO/IEO ROI',
      dataIndex: 'roi',
      key: 'roi',
      sortIcon: renderSortIcon,
      sorter: true,
      width: 88,
      align: 'right',
      render: (_, { roi }) => {
        if (!roi) return '-';
        return (
          <div className='text-grey-700 text-sm font-semibold font-jsb text-right'>
            {currencyFormat(Number(roi), '')}x
          </div>
        );
      },
    },
    {
      title: 'Unlock Progress',
      dataIndex: 'unlockedTokensPercent',
      key: 'unlockedTokensPercent',
      width: 168,
      sorter: true,
      render: (_, { unlockedTokensPercent }) => {
        if (!unlockedTokensPercent) return '-';
        return (
          <div>
            <div className='mb-1 text-sm text-grey-700 font-jsb font-semibold'>
              {round(unlockedTokensPercent, 2) || 0}%
            </div>
            <div className='relative w-full max-w-[150px]'>
              {unlockedTokensPercent ? (
                <div
                  className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-1'
                  style={{ width: unlockedTokensPercent + '%' }}
                ></div>
              ) : (
                <div
                  className='unlock absolute top-1/2 left-0 -translate-y-1/2 bg-primary-500 h-1.5 rounded-xl z-1'
                  style={{ width: 0 + '%' }}
                ></div>
              )}
              <div className='locked bg-grey-300 w-full h-1.5 rounded-xl'></div>
            </div>
          </div>
        );
      },
    },
    {
      title: 'Next Unlock',
      dataIndex: 'nextTokenPrice',
      key: 'date',
      width: 288,
      align: 'right',
      sortIcon: renderSortIcon,
      sorter: true,
      render: (
        _,
        { nextTokenPrice, nextTokenPricePercent, nextUnlockDate }
      ) => {
        return (
          <NextUnlock
            nextTokenPrice={nextTokenPrice}
            nextTokenPricePercent={nextTokenPricePercent}
            nextUnlockDate={nextUnlockDate}
          />
        );
      },
    },
  ];

  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [filter, setFilter] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Launchpad[]>([]);
  const getTokenUnlock = useCallback(async () => {
    const response: IResponseAxios<IUnlock> = await FetchTokenUnlock({
      limit: pageSize,
      page: currentPage,
      sort_by: order.columnKey,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      search_key: filter.map((e) => e.code),
    });

    if (!response) return;
    const { data, total } = response;
    setDefaultData(data);
    setTotal(total!!);

    /* #endregion */
  }, [pageSize, currentPage, order, filter]);

  const _onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const _onChangeSize = (value: number) => {
    setCurrentPage(1);
    setPageSize(value);
  };

  const _openModal = (ar: any[]) => {
    setModalData(ar);
    setIsModalOpen(true);
  };

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + (data || []).length - 1;
    return (
      <span className='table-total font-medium font-jm text-sm'>
        {start} - {end} from {total}
      </span>
    );
  };

  useEffect(() => {
    getTokenUnlock();
  }, [pageSize, currentPage, order, filter]);

  const _setFilter = (value: any[]) => {
    setFilter(value);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={'us-table'}>
      <UsHeader onFilter={_setFilter} />
      <div className='overflow-x-auto'>
        <CommonTable
          columns={columns}
          dataSource={data || []}
          pagination={{ position: ['none'], pageSize }}
          showSorterTooltip={false}
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
      </div>

      <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
          size='small'
        />
      </div>

      <div className='pt-6 flex items-center justify-between table-pagination'>
        <div>{_renderRange()}</div>
        <div className='pagination-desktop'>
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
            onChange={_onChangeSize}
            pageSize={pageSize.toString()}
          />
        </div>
      </div>

      <Modal
        title='Launchpads'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={350}
      >
        <div className='w-full overflow-y-auto h-60'>
          {modalData.map((e, index) => {
            return (
              <div
                className='flex items-center mt-2 mb-2'
                key={`modal-index-${index}`}
              >
                <img src={changeImageUrl(e.image)} className='w-6 h-6 mr-3' />
                <p className=''>{e.name}</p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
