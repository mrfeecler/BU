import IconSearchCoinTab from '@/assets/icons/home/IconSearchCoinTab';
import CustomSelect from '@/components/CustomSelect';
import { Checkbox } from 'antd';
import { orderBy, uniqBy } from 'lodash';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { memo, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { IFilterCustom, ISearchData } from './props';
import './styles.scss';

const FilterCustom = (props: IFilterCustom) => {
  const {
    renderOption,
    renderTag,
    onChange,
    getData,
    placeholder,
    isSortSelected,
    value,
    className,
    overlayClassName,
    focusRefresh,
    defaultSelectIcon,
  } = props;
  const [searchData, setSearchData] = useState<ISearchData[]>([]);
  const [arSelected, setArSelected] = useState<ISearchData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState<string[]>([]);
  const [textSearch, setTextSearch] = useState('');
  const debouncedValue = useDebounce<string>(textSearch, 500);

  const [searchKey, setSearchKey] = useState('');
  useEffect(() => {
    if (!value) return;
    setArSelected(value);
    setIsSelected(value.map((e) => e.code));
  }, [value]);

  const _getData = async (searchKey?: string, arraySelected?: any[]) => {
    setIsLoading(true);
    const data = await getData({
      searchKey: searchKey ?? '',
    });
    setIsLoading(false);
    setSearchData([..._mergeAr(arraySelected || arSelected, data)]);
    setSearchKey(searchKey || '');
  };

  const _mergeAr = (oldAr: any[], newAr: any[]) => {
    const allDt = [...oldAr, ...newAr];
    return uniqBy(allDt, (e) => e.code ?? e.name);
  };

  const _renderOptions = () => {
    const elements: JSX.Element[] = [];

    _convertSelected().forEach((s) => {
      const checked = isSelected.includes(s.code);
      elements.push(renderOption({ ...s, checked }));
    });

    return elements;
  };

  const _convertSelected = () => {
    let arConvert: ISearchData[] = [];

    switch (isSortSelected) {
      case 'alphabet':
        arConvert = orderBy(
          searchData,
          ['isSelected', 'name'],
          ['desc', 'asc']
        );
        break;

      case 'newToOld':
        arConvert = orderBy(
          searchData,
          ['isSelected', 'selectedTime'],
          ['desc', 'desc']
        );
        break;
      case 'oldToNew':

      default:
        arConvert = orderBy(
          searchData,
          ['isSelected', 'selectedTime'],
          ['desc', 'asc']
        );
        break;
    }
    return arConvert;
  };

  const _onChangeSelect = (value: string[]) => {
    // value = value.reverse();
    searchData.forEach((e) => {
      const index = value.indexOf(e.code);
      e.isSelected = index > -1;
      e.selectedTime = index > -1 ? new Date().getTime() + index : null;
    });
    const arrSelected = [..._convertSelected().filter((s) => s.isSelected)];
    setArSelected(arrSelected);
    setIsSelected(value);
    onChange(value, arrSelected);
    _getData(searchKey, arrSelected);
  };

  const _tagRender = (props: CustomTagProps) => {
    const index = arSelected.findIndex((e) => e.code === props.value);
    return renderTag({ ...props, index, rawData: arSelected[index] });
  };

  const _onSearch = (value: string) => {
    setTextSearch(value);
  };

  useEffect(() => {
    _getData(debouncedValue);
  }, [debouncedValue]);
  /* #endregion */
  return (
    <div className='select-coin-custom'>
      <CustomSelect
        className={className}
        placeholder={placeholder ?? ''}
        mode='multiple'
        size='large'
        prefixIcon={<IconSearchCoinTab />}
        loading={isLoading}
        menuItemSelectedIcon={
          !!defaultSelectIcon || defaultSelectIcon === undefined ? (
            <Checkbox checked className='custom-checkbox' />
          ) : null
        }
        onChange={_onChangeSelect}
        tagRender={_tagRender}
        onSearch={_onSearch}
        value={arSelected.map((e) => e.code)}
        notFoundContent={
          <div className='m-[12px] text-[14px] font-medium text-[#333747] font-jm'>
            No results found
          </div>
        }
        onBlur={() => !!textSearch && _onSearch('')}
        onFocus={() =>
          (!!focusRefresh || focusRefresh === undefined) && _getData('')
        }
        filterOption={(input, option) => {
          if (!option) return false;
          if (option['isSelectOption']) return true;
          return (
            option.key.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
            option
              .value!!.toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0
          );
        }}
        dropdownRender={(menu) => {
          return <div className={overlayClassName}>{menu}</div>;
        }}
      >
        {_renderOptions()}
      </CustomSelect>
    </div>
  );
};

export default memo(FilterCustom);
