import { Pagination } from 'antd';
import SelectItemTable from '@/components/SelectItemTable';
import { IPagingParams } from '@/models/IPaging';

export type CoreTableFooterProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  length: number;
  onChangePagingParams: (params: IPagingParams) => void;
  // onChangePage: (page: number) => void;
  // onChangeSize: (size: number) => void;
};

export const CoreTableFooter = (props: CoreTableFooterProps) => {
  const { total, pageSize, currentPage, length, onChangePagingParams } = props;

  const start = (currentPage - 1) * pageSize + 1;
  const end = start + length - 1;

  const renderRangePagination = () => {
    return (
      <div className={'text-sm font-medium font-jm text-[#333747]'}>
        {start} - {end} from {total}
      </div>
    );
  };

  const _changePageSize = (pageSize: number) => {
    const totalItem = pageSize * currentPage;
    let pageChange = currentPage;
    if (totalItem > total) {
      const maxPage = Math.round(total / pageSize);
      pageChange = maxPage;
    }
    onChangePagingParams({
      page: pageChange ? pageChange : 1,
      pageSize,
    });
  };

  const _onChangePage = (page: number) => {
    onChangePagingParams({
      pageSize,
      page,
    });
  };

  return (
    <div className={'core-table__footer'}>
      <div className='pt-6 flex gap-6 flex-col w-full items-center justify-center md:hidden'>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showLessItems
          showSizeChanger={false}
        />
        <div className={'flex items-center w-full justify-between'}>
          {renderRangePagination()}
          <SelectItemTable onChange={_changePageSize} />
        </div>
      </div>

      <div className='pt-6 items-center justify-between hidden md:flex'>
        {renderRangePagination()}
        <Pagination
          total={total}
          pageSize={pageSize}
          current={currentPage}
          onChange={_onChangePage}
          showSizeChanger={false}
        />
        <SelectItemTable
          onChange={_changePageSize}
          pageSize={pageSize.toString()}
        />
      </div>
    </div>
  );
};
