import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import {
  FactoryColumns,
  factoryColumns,
  factoryMobileColumnsKey,
} from './factory-columns';
import { renderSortIcon } from '@/helpers';
import { ICoreTableHeaderProps } from './core-table-header';
import { CoreTableProps } from '@/components/core-table/index';
import { CoreTableFooterProps } from '@/components/core-table/core-table-footer';

export const getColumns = <T = AnyObject>(
  type: FactoryColumns,
  isMobile?: boolean,
  mobileColsKey?: string[]
): ColumnsType<T> => {
  const _column = factoryColumns[type] as ColumnsType<T>;

  const getMobileColsKey = mobileColsKey ?? factoryMobileColumnsKey[type];
  if (isMobile) {
    return _column
      .filter((column) => {
        return getMobileColsKey.includes(column.key as string);
      })
      .map((column) => {
        return {
          ...column,
          fixed: false,
          width: 'auto',
          sortIcon: column.sorter ? renderSortIcon : undefined,
        };
      });
  }
  return _column.map((column) => {
    return {
      ...column,
      sortIcon: column.sorter ? renderSortIcon : undefined,
    };
  });
};

export const getHeaderCoreProps = (
  props: CoreTableProps
): ICoreTableHeaderProps => {
  const { onChangeFilterSelect, isFilter, isCustomize, onCustomize, onFilter, type } =
    props;

  return {
    onChangeFilterSelect,
    isFilter,
    isCustomize,
    onCustomize,
    onFilter,
    type
  };
};

export const getFooterCoreProps = (
  props: CoreTableProps
): CoreTableFooterProps => {
  const {
    total = 0,
    pageSize = 10,
    currentPage = 1,
    data,
    onChangePagingParams = () => {},
    // onChangeSize = () => {},
  } = props;

  return {
    total,
    pageSize,
    currentPage,
    length: data.length,
    onChangePagingParams,
    // onChangePage,
    // onChangeSize,
  };
};
