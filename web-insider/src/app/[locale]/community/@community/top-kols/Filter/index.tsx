'use client';
import IconChevronDown from '@/assets/icons/IconChevronDown';
import IconTick from '@/assets/icons/IconTick';
import FilterCustom from '@/components/FilterCustom';
import { ICustomTagProp, IOptionCustom } from '@/components/FilterCustom/props';
import Text from '@/components/Text';
import { cn } from '@/helpers/functions';
import { GetKOLsFilterNames } from '@/usecases/community';
import { Checkbox, Flex, Select, Tag } from 'antd';
import { memo, useContext, useRef, useState } from 'react';
import TopKOLContext from '../Context/TopKOLContext';
import { CountryOptions } from './Data';

const FilterTopKOL = () => {
  const refSelect = useRef<any>(null);

  const [focusCountry, setFocusCountry] = useState(false);

  const { handleFilter } = useContext(TopKOLContext);

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

  const _renderOption = ({ name, code, checked }: IOptionCustom) => {
    return (
      <Select.Option isSelectOption={true} value={code} key={name}>
        <Flex
          align='center'
          justify='space-between'
          gap={16}
          className='mx-0 select-coin-custom__item px-1 py-[7px]'
        >
          <Text>{name}</Text>
          <Checkbox checked={checked} className='custom-checkbox' />
        </Flex>
      </Select.Option>
    );
  };

  const _getData = async ({ searchKey }: any) => {
    const res: any = await GetKOLsFilterNames({
      search_key: searchKey,
    });
    if (!res) return [];

    return res.map((e: any) => ({
      name: e.name,
      code: e.twitter,
      isSelected: false,
    }));
  };

  const _onSelectFilter = (value: string[]) => {
    handleFilter?.({ search_key: value.join(',') });
  };

  const handleFocusCountry = (status?: boolean) => {
    if (refSelect.current && status === false) refSelect.current.blur();
    setFocusCountry((prev) => (status !== undefined ? status : !prev));
  };

  const handleSelectCountry = (value: string) => {
    handleFilter?.({ country: value });
    handleFocusCountry(false);
  };

  return (
    <Flex gap={8} align='center'>
      <Select
        ref={refSelect}
        showSearch={focusCountry}
        defaultValue={''}
        options={CountryOptions}
        suffixIcon={<IconChevronDown />}
        menuItemSelectedIcon={
          <Flex align='center' justify='center' className='w-5 h-5'>
            <IconTick />
          </Flex>
        }
        onFocus={() => handleFocusCountry(true)}
        onBlur={() => handleFocusCountry(false)}
        onChange={handleSelectCountry}
        popupClassName={cn(
          '[&_.rc-virtual-list-scrollbar]:!w-1',
          '[&_.rc-virtual-list-scrollbar-thumb]:!bg-[#E5E6EB]',
          '[&_.ant-select-item]:!p-3',
          '[&_.ant-select-item-option-selected]:!bg-white'
        )}
        className={cn(
          '!h-11 min-w-[280px]',
          '[&_.ant-select-selector]:!px-4',
          '[&_.ant-select-selector]:!border-[#E5E6EB]',
          '[&_input]:!font-jm',
          focusCountry && '[&_.ant-select-selection-item>div]:hidden'
        )}
      />
      <FilterCustom
        placeholder='Twitter Name'
        renderOption={_renderOption}
        renderTag={_renderTag}
        onChange={_onSelectFilter}
        getData={_getData}
        focusRefresh={false}
        defaultSelectIcon={false}
        className='!font-jm'
      />
    </Flex>
  );
};

export default memo(FilterTopKOL);
