import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import { FetchCoinFundraising, FetchSearchExchange } from '@/usecases/coin-info';
import { Checkbox, Select, Tag } from 'antd';
import { random } from 'lodash';
import React from 'react';

export default function SelectMarket({ onChangeSearhKey, slug }:any) {
  async function fetchSearchExchange(searchKey: string) {
    const res = await FetchSearchExchange({ key: slug, search_key: searchKey });

    return res;
  }

  const _renderOption = ({ name, key, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={key} key={name}>
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
              {/* <div
                style={{
                  fontFamily: 'Plus Jakarta Sans Medium',
                }}
                className='code px-[8px] rounded-[4px] bg-[#EEF2F6] text-[#9FA4B7] leading-5 text-[12px] pt-[2px]'
              >
                {key}
              </div> */}
          </div>
          <div className=''>
            {!checked ? <Checkbox className='custom-checkbox' /> : null}
          </div>
        </div>
      </Select.Option>
    );
  };

  const _renderTag = (options: ICustomTagProp) => {
    const { closable, onClose, index, rawData } = options;
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
  const _changeSearchKey = async ( searchKeys:string[]) => { 
       let searchKey = '';
       for (let i in searchKeys) {
         searchKey += searchKeys[i] + ',';
       }
       if (searchKey.length > 0) {
         searchKey = searchKey.substring(0, searchKey.length - 1);
       }
    onChangeSearhKey(searchKey);
  };

  const _getData = async ({ searchKey }: any) => {
    const res: any = await fetchSearchExchange(searchKey);
    let list = [];
    for (let i in res) {
      let item = {
        id: i,
        name: res[i].exchangeName,
        key: res[i].exchangeKey,
        code: res[i].exchangeKey,
        isSelected: true,
      };
      list.push(item);
    }
    return list;
    // return [
    //   ...Array.from(Array(20)).map(() => ({
    //     id: random(1, 100000),
    //     name: "sdsdsd",
    //     code: `code-${searchKey}${random(100, 999)}`,
    //     thumb: '',
    //     isSelected: false,
    //   })),
    // ];
  };

  return (
    <FilterCustom
      placeholder='Filter Exchanges'
      renderOption={_renderOption}
      renderTag={_renderTag}
      onChange={(value) => {
        _changeSearchKey(value)
      }}
      getData={_getData}
    />
  );
}
