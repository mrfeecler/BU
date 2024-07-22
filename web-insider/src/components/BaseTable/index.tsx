'use client';
import { cn } from '@/helpers/functions';
import { Pagination } from 'antd';
import CommonTable from '../CommonTable/common-table';
import SelectItemTable from '../SelectItemTable';
import './index.scss';

export default function BaseTable(props: any) {
  const {
    columns,
    data,
    pageSize,
    currentPage,
    total,
    onChangePagingParams,
    // _onChangeSize,
    ...rest
  } = props;

  const _renderRange = () => {
    const start = (currentPage - 1) * pageSize + 1;
    const end = start + data.length - 1;
    return (
      <span className='table-total text-grey-700 text-sm font-medium font-jm'>
        {start} - {end} from {total}
      </span>
    );
  };

  const _changePageSize = (pageSize: number) => {
    const totalItem = pageSize * currentPage;
    let pageChange = currentPage;
    if (totalItem > total) {
      const maxPage = Math.round(total / pageSize);
      pageChange = maxPage > 0 ? maxPage : 1;
    }
    onChangePagingParams({
      page: pageChange,
      pageSize,
    });
  };

  const _onChangePage = (page: number) => {
    onChangePagingParams({
      pageSize,
      page,
    });
  };
  // const _onChangeSize = (pageSize: number) => {
  //   onChangePagingParams({
  //     pageSize,
  //     page: currentPage,
  //   });
  // };

  return (
    <div className='base-table'>
      <CommonTable
        columns={columns as any}
        dataSource={data as any}
        pagination={false}
        className='overflow-x-auto overflow-y-hidden'
        {...rest}
      />
      <div className='pt-6 flex items-center justify-center table-pagination pagination-mobile'>
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
        <div className='pagination-desktop'>
          <Pagination
            total={total}
            pageSize={pageSize}
            current={currentPage}
            onChange={_onChangePage}
            showSizeChanger={false}
            className={cn(
              '!flex',
              '[&_li]:!flex',
              '[&_li]:!justify-center',
              '[&_li]:!items-center'
            )}
          />
        </div>
        <div>
          <SelectItemTable onChange={_changePageSize} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
}
