import { useState } from 'react';
import { IGainer } from './props';
import { CoreTable } from '@/components/core-table';
import { isArray } from 'lodash';

type TopDataProps = {
  title?: string;
  data: IGainer[];
  onChangeOrder: ({
    columnKey,
    order,
  }: {
    columnKey: string;
    order: string;
  }) => void;
};

const TopData = ({ title, data, onChangeOrder }: TopDataProps) => {
  const handleOnChange = (tableConfig: any, _filter: any, sort: any) => {
    const itemSort = isArray(sort) ? sort[0] : sort;
    onChangeOrder({
      columnKey: itemSort.columnKey ? itemSort.columnKey.toString() : '',
      order: itemSort.order ? itemSort.order.toString() : '',
    });
  };

  return (
    <div className='flex-1 flex-col gap-4'>
      {title && (
        <h4 className='font-bold text-[#333747] text-[20px] tracking-[0] leading-[28px] mb-4 whitespace-nowrap'>
          {title}
        </h4>
      )}

      <CoreTable
        data={data}
        fixedWidth
        type={'home_gainers'}
        renderFooter={() => null}
        renderHeader={() => null}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default TopData;
