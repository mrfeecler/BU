import Text from '@/components/Text';
import { renderSortIcon } from '@/helpers';
import { cn } from '@/helpers/functions';
import { Empty, Table, TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { get, sumBy } from 'lodash';
import { forwardRef, memo } from 'react';
import { useWindowSize } from 'usehooks-ts';
import './index.scss';

type RecordType = Record<string, any>;

function wrapWithWidth(
  f: any,
  isAutoWidth: boolean,
  width?: string | number,
  align?: string
) {
  if (!f) return;
  return function (...args: any) {
    let style = {};
    if (width) {
      const property = isAutoWidth ? 'minWidth' : 'width';
      style = {
        [property]: width,
        display: 'block',
        overflow: 'hidden',
      };
      if (align) {
        style = { ...style, float: align };
      }
    }
    return <span style={style}>{f(...args)}</span>;
  };
}

interface IColumnCustomTable extends ColumnType<RecordType> {
  isAutoWidth: boolean;
}

function convertColumn(column: IColumnCustomTable) {
  column.sortIcon = column.sorter ? renderSortIcon : undefined;
  column.render = wrapWithWidth(
    column.render,
    column.isAutoWidth,
    column.width,
    column.align
  );
  return column;
}

interface IWapperTable extends TableProps<any> {
  fixedWidth?: boolean;
}

const WapperTable = forwardRef((props: IWapperTable, ref?: any) => {
  const { width } = useWindowSize();
  const { fixedWidth } = props;
  const columns = get(props, 'columns', []);
  const totalWidth = sumBy(columns, (c: any) => {
    return c.width ?? 0;
  });
  const isAutoWidth = !fixedWidth ? totalWidth < width - 100 : false;

  const columnsConvert = columns.map((column) => {
    return convertColumn({ ...column, isAutoWidth });
  });

  return (
    <div className='common-table'>
      <Table
        ref={ref}
        {...props}
        sticky
        className={cn(props.className, 'overflow-visible')}
        columns={columnsConvert}
        scroll={{ x: 'max-content' }}
        showSorterTooltip={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<Text className='!text-[#00000040]'>No data</Text>}
            />
          ),
        }}
      />
    </div>
  );
});

export default memo(WapperTable);
