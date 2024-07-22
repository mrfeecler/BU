'use client';
import IconChevronDown from '@/assets/icons/IconChevronDown';
import Text from '@/components/Text';
import { renderSortIcon } from '@/helpers';
import { cn } from '@/helpers/functions';
import { Empty, Flex, Pagination, Select, SelectProps, Table } from 'antd';
import { SorterResult } from 'antd/es/table/interface';
import { memo, useContext, useMemo } from 'react';
import TopKOLContext, { TTopKOLData } from '../Context/TopKOLContext';
import { ColumnsTable } from './Data';

const TableTopKOL = () => {
  const { loading, data, total, filter, handleFilter } =
    useContext(TopKOLContext);

  const Total = useMemo(() => {
    const from = filter.limit * (filter.page - 1) + 1;
    const to = filter.limit * filter.page;

    return (
      <Text>
        {from}-{to} from {total}
      </Text>
    );
  }, [filter, total]);

  const SizeChanger = useMemo(() => {
    const options: SelectProps['options'] = [
      {
        label: <Text>Show rows 10</Text>,
        value: 10,
      },
      {
        label: <Text>Show rows 20</Text>,
        value: 20,
      },
      {
        label: <Text>Show rows 50</Text>,
        value: 50,
      },
      {
        label: <Text>Show rows 100</Text>,
        value: 100,
      },
    ];

    return (
      <Select
        value={filter.limit}
        options={options}
        suffixIcon={<IconChevronDown />}
        onChange={(value) => handleFilter({ limit: value })}
        popupClassName={cn('[&_.ant-select-item-option-selected]:!font-normal')}
        className={cn(
          '!h-9 !w-[155px]',
          '[&_.ant-select-selector]:!px-4',
          '[&_.ant-select-selector]:!border-[#D1D2DC]'
        )}
      />
    );
  }, [filter, handleFilter]);

  const handleSort = ({ columnKey, order }: SorterResult<TTopKOLData>) => {
    handleFilter({
      sort_by: order ? columnKey : undefined,
      sort_order: order ? (order === 'ascend' ? 'asc' : 'desc') : undefined,
    });
  };

  return (
    <Flex vertical gap={24} className='w-[calc(100vw-288px)]'>
      <Table
        sticky
        rowKey={({ _id }) => _id}
        columns={ColumnsTable?.map((col) => {
          if (col.sorter)
            return {
              ...col,
              sortIcon: renderSortIcon,
            };
          return col;
        })}
        scroll={{ x: 'max-content' }}
        dataSource={data}
        loading={loading}
        showSorterTooltip={false}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<Text className='!text-[#00000040]'>No data</Text>}
            />
          ),
        }}
        onChange={(_, __, sorter: any) => handleSort(sorter)}
        className={cn(
          '[&_.ant-table-cell]:!bg-white',
          '[&_.ant-table-thead_.ant-table-cell]:!border-t',
          '[&_.ant-table-thead_.ant-table-cell]:!border-[#E5E6EB]',
          '[&_.ant-table-thead_.ant-table-cell]:before:!w-0',
          '[&_.ant-table-thead_.ant-table-cell]:!rounded-none'
        )}
      />
      <Flex justify='space-between' align='center'>
        {Total}
        <Pagination
          current={filter.page}
          pageSize={filter.limit}
          total={total}
          onChange={(page) => handleFilter({ page })}
          showSizeChanger={false}
          className={cn(
            '[&_.ant-pagination-item-active]:!bg-[#5766FF]',
            '[&_.ant-pagination-item-active]:!border-none',
            '[&_.ant-pagination-item-active_a]:!text-[#FCFCFD]'
          )}
        />
        {SizeChanger}
      </Flex>
    </Flex>
  );
};

export default memo(TableTopKOL);
