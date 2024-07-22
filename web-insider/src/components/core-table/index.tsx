'use client';
import {
  getColumns,
  getFooterCoreProps,
  getHeaderCoreProps,
} from '@/components/core-table/utils';
import { getIndexTable } from '@/helpers';
import { IPagingParams } from '@/models/IPaging';
import { TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import clsx from 'clsx';
import React, { HTMLAttributes, useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import CommonTable from '../CommonTable/common-table';
import { CoreTableFooter } from './core-table-footer';
import { CoreTableHeader, ICoreTableHeaderProps } from './core-table-header';
import { FactoryColumns } from './factory-columns';
import './styles.scss';

export type CoreTableProps<T = AnyObject> = TableProps<T> & {
  data: T[];
  total?: number;
  pageSize?: number;
  currentPage?: number;
  orderDirection?: string;
  orderBy?: string;
  // onChangePage?: (page: number) => void;
  // onChangeSize?: (size: number) => void;
  onChangePagingParams?: (params: IPagingParams) => void;
  type: FactoryColumns;
  mobileColumnsKey?: string[];
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  fixedWidth?: boolean;
  className?: HTMLAttributes<HTMLDivElement>['className'];
} & ICoreTableHeaderProps;

export const CoreTable = <T extends AnyObject = AnyObject>(
  props: CoreTableProps<T>
) => {
  const {
    pagination = false,
    data = [],
    type,
    mobileColumnsKey,
    renderFooter,
    renderHeader,
    className,
    ...rest
  } = props;

  const isMobile = useMediaQuery('(max-width: 640px)');

  const columns = useMemo(
    () => getColumns<AnyObject>(type, isMobile, mobileColumnsKey),
    [type, isMobile, mobileColumnsKey]
  );

  const formattedData = useMemo(
    () =>
      data.map((item, index) => {
        return {
          ...item,
          _index: getIndexTable(
            props.currentPage || 1,
            props.pageSize || 10,
            index,
            props.orderDirection === 'descend' && props.orderBy === '#'
              ? props.total
              : 0
          ),
        };
      }),
    [props]
  );

  return (
    <div className={clsx('core-table', className)}>
      {renderHeader ? (
        renderHeader()
      ) : (
        <CoreTableHeader {...getHeaderCoreProps(props)} />
      )}

      <CommonTable
        columns={columns}
        dataSource={formattedData}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        className='overflow-x-auto overflow-y-hidden'
        {...rest}
      />
      {renderFooter ? (
        renderFooter()
      ) : (
        <CoreTableFooter {...getFooterCoreProps(props)} />
      )}
    </div>
  );
};
