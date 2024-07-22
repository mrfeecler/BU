import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { FetchIeoIdo } from '@/usecases/ieo-ido';
import { Checkbox, Select, Tag } from 'antd';
import React from 'react';
import { getIeoIdoApiSearchPath } from '../../config';
import { SearchProject } from '../../types';

type PropsType = {
  category: string;
  keySlug?: string;
  onFilterChange: (values: string[]) => void;
  placeholder?: string;
};

export default function SelectProject(props: PropsType) {
  const _renderOption = ({
    name,
    key,
    checked,
    code,
    symbol,
  }: IOptionCustom) => {
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
        {rawData.name}
      </Tag>
    );
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    let url = getIeoIdoApiSearchPath(props.category);
    if (
      (props.category === 'upcoming' || props.category === 'ended') &&
      props.keySlug
    ) {
      url = `ieo-ido/launch-pad-detail/search?search_key${
        searchKey ? `=${searchKey}` : ''
      }&key=${props.keySlug}&status=${
        props.category === 'ended' ? 'past' : 'upcoming'
      }`;
    } else if (props.category === 'upcoming' || props.category === 'ended') {
      url += `?search_key${searchKey ? `=${searchKey}` : ''}&status=${
        props.category === 'ended' ? 'past' : 'upcoming'
      }`;
    } else {
      url += `?search_key${searchKey ? `=${searchKey}` : ''}`;
    }

    const data = (await FetchIeoIdo(url)) as unknown as SearchProject[];

    return data.map((searchItem: SearchProject) => ({
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
      placeholder={props.placeholder || 'Filter projects'}
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={props.onFilterChange}
      getData={_getData}
      className='!font-jm'
    />
  );
}
