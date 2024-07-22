import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { CategoryCoinsSearch } from '@/usecases/category';
import { Checkbox, Select, Tag } from 'antd';
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react';
import { SearchProject } from '../../types';

type PropsType = {
  onFilterChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectProject(props: PropsType) {
  const params = useParams<{ id: string }>();
  const categoryId = params.id;

  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');

  const _renderOption = ({ name, symbol, checked, code }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={code}>
        <div className='flex pr-0 pl-0 mr-0 ml-0 select-coin-custom__item px-3 py-1 justify-between'>
          <div className='flex gap-1 items-start'>
            <span
              style={{
                fontFamily: 'Plus Jakarta Sans Medium',
              }}
              className='name'
            >
              {name}
            </span>
            {symbol ? (
              <div
                style={{
                  fontFamily: 'Plus Jakarta Sans Medium',
                }}
                className='code px-[8px] rounded-[4px] bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-[12px] pt-[2px]'
              >
                {symbol}
              </div>
            ) : (
              ''
            )}
          </div>
          <div className=''>
            {!checked ? <Checkbox className='custom-checkbox' /> : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { value, closable, onClose, index, rawData } = options;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    if (index > 2) return <></>;

    if (index === 2)
      return (
        <Tag color='#5766ff' style={{ marginRight: 3 }}>
          ...
        </Tag>
      );
    return (
      <Tag
        color='#5766ff'
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {rawData.name ?? value}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const data = await CategoryCoinsSearch({
      search_key: searchKey || '',
      category_id: categoryId,
      slug,
    }) as unknown as SearchProject[];

    return data.map((searchItem: any) => ({
      id: searchItem.key,
      name: searchItem.name,
      code: searchItem.key,
      thumb: '',
      isSelected: false,
      symbol: searchItem.symbol,
    }));
  };

  return (
    <FilterCustom
      placeholder={props.placeholder || 'Search'}
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={(keys) => {
        props.onFilterChange(keys);
      }}
      getData={_getData}
      className='!font-jm'
    />
  );
}
