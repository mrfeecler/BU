import { ORDER, SOCKET_EVENTS, TIME_FILTER_ALL } from '@/helpers/constants';
import { caculatorAverage24h, cn } from '@/helpers/functions';
import { Dropdown, Flex, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { FetchTrendings } from '../../../usecases/home';
import './style.scss';

import IconSelectArrow from '@/assets/icons/IconSelectArrow';
import Text from '@/components/Text';
import { CoreTable } from '@/components/core-table';
import { useDataSocket } from '@/hooks/useDataSocket';
import { IPagingParams } from '@/models/IPaging';
import { isArray } from 'lodash';
import { useMediaQuery } from 'usehooks-ts';

const IconFire = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M19.5 14.0003C19.5 18.1354 16.136 21.5003 12 21.5003C7.864 21.5003 4.5 18.1354 4.5 14.0003C4.5 11.7523 5.142 10.1513 6.646 8.64635C6.941 8.35035 7.275 8.05434 7.621 7.74834C9.037 6.49434 10.5 5.19737 10.5 2.99937C10.5 2.81537 10.602 2.64533 10.764 2.55833C10.926 2.47133 11.123 2.48036 11.277 2.58336C11.337 2.62336 16.915 6.44633 14.055 13.0143C14.726 12.6393 15.529 12.0243 16.022 11.0693C16.338 10.4573 16.499 9.76137 16.499 8.99937C16.499 8.79637 16.622 8.61336 16.81 8.53636C16.996 8.45936 17.213 8.50336 17.356 8.64836C18.719 10.0334 19.5 11.9844 19.5 14.0003Z'
        fill='url(#paint0_linear_2870_33418)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2870_33418'
          x1='12'
          y1='2.49902'
          x2='12'
          y2='21.5003'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FAA93F' />
          <stop offset='1' stopColor='#F04636' />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Trending = () => {
  const { data, setDefaultData } = useDataSocket<any[]>(
    SOCKET_EVENTS.coinChange,
    {
      price: 'price',
      percent_change_24h: 'average24h',
      volume_24h: 'volume24h',
      market_cap: 'marketCap',
    }
  );

  const [activeKey, setActiveKey] = useState('1');
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState({
    columnKey: '',
    order: '',
  });

  const [pagingParams, setPagingParams] = useState<IPagingParams>({
    page: 1,
    pageSize: 20,
  });

  const isMobile = useMediaQuery('(max-width: 640px)');

  const TimeOptions = TIME_FILTER_ALL.map((item) => ({
    ...item,
    label: <Text weight='semiBold'>{item.label}</Text>,
  }));

  const [timeSelected, setTimeSelected] = useState(TimeOptions[0]);

  function getTrendings(params: any) {
    FetchTrendings(params).then((res: any) => {
      res.data.map((item: any) => {
        const average24 = caculatorAverage24h(item.price, item.histPrices);
        item.average24 = average24;
        return item;
      });
      setDefaultData(res.data);
      setTotal(res.total);
    });
  }

  useEffect(() => {
    getTrendings({
      limit: pagingParams.pageSize,
      page: pagingParams.page,
      sort_order: ORDER[order.order as keyof typeof ORDER],
      sort_by: order.order ? order.columnKey : '',
      duration: timeSelected.key,
    });
  }, [pagingParams, order, timeSelected]);

  const tabs = [
    'Trending Coins',
    'Real World Assets',
    'Zero Knowledge (ZK)',
    'Binance Launchpad ',
  ];

  const _onChangeTime = ({ key }: { key: string }) => {
    const item = TimeOptions.find((a) => a?.key === key);
    if (!item) return;
    setTimeSelected({
      ...item,
    });
    // onFilterTime(item.key);
  };

  const handleOnChange = (_page: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    setOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  const renderDropdown = () => {
    return (
      <Dropdown
        overlayClassName={cn(
          '[&_.ant-dropdown-menu]:!p-2',
          '[&_.ant-dropdown-menu-item]:!py-2',
          '[&_.ant-dropdown-menu-item-selected]:!bg-[#EEF2F6]'
        )}
        menu={{
          items: TimeOptions,
          selectable: true,
          selectedKeys: [timeSelected.key],
          onClick: _onChangeTime,
        }}
        trigger={['click']}
        className='rounded border border-[#D1D2DC] hover:cursor-pointer mr-2'
      >
        <Flex
          gap={8}
          justify='space-between'
          align='center'
          className='py-2 px-4'
        >
          <Text>{timeSelected.label}</Text>
          <IconSelectArrow />
        </Flex>
      </Dropdown>
    );
  };

  return (
    <div className='tab-trending flex flex-col'>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        tabBarExtraContent={!isMobile && renderDropdown()}
        moreIcon={null}
        items={tabs.map((label, i) => {
          const id = String(i + 1);
          return {
            key: id,
            label: (
              <Text
                weight={activeKey === id ? 'bold' : undefined}
                color={activeKey === id ? 'primary' : undefined}
                size={16}
                lineHeight={24}
                className={cn(activeKey !== id && 'opacity-50')}
              >
                {label}
              </Text>
            ),
            children: (
              <>
                {isMobile && <div className='pb-4'>{renderDropdown()}</div>}
                <CoreTable
                  className={'md:p-6'}
                  data={data || []}
                  type={'home_trending'}
                  onChange={handleOnChange}
                  onChangePagingParams={setPagingParams}
                  pageSize={pagingParams.pageSize}
                  currentPage={pagingParams.page}
                  orderDirection={order.order}
                  orderBy={order.columnKey === 'c_marketCap' ? '#' : ''}
                  total={total}
                  renderHeader={() => null}
                />
              </>
            ),
            icon: (
              <div className={cn(activeKey !== id && 'opacity-50')}>
                <IconFire />
              </div>
            ),
            disabled: true,
          };
        })}
      />
    </div>
  );
};

export default Trending;
