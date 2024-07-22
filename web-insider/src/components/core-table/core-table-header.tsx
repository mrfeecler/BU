import { ISearchFilter } from '@/app/home/coin/props';
import { IconCustomCointTab } from '@/assets/icons/home/IconCustomCoinTab';
import { IconFilterCoinTab } from '@/assets/icons/home/IconFilterCoinTab';
import FilterCustom from '@/components/FilterCustom';
import {
  ICustomTagProp,
  IOptionAny,
  IOptionCustom,
} from '@/components/FilterCustom/props';
import {
  SearchCategoriesFilter,
  SearchCoinsFilter,
  SearchFundraisingsFilter,
  SearchUpcomingFilter,
} from '@/usecases/home';
import { Button, Checkbox, Select, Tag } from 'antd';
import './styles.scss';

export type ICoreTableHeaderProps = {
  onChangeFilterSelect?: (value: string[]) => void;
  isCustomize?: boolean;
  isFilter?: boolean;
  onCustomize?: () => void;
  onFilter?: () => void;
  type: string;
};

export const CoreTableHeader = (props: ICoreTableHeaderProps) => {
  const {
    onChangeFilterSelect = () => {},
    isCustomize = true,
    isFilter = true,
    onCustomize = () => {},
    onFilter = () => {},
    type,
  } = props;
  const _renderOption = ({ name, code, key, checked, symbol }: IOptionCustom) => {
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

  const handleDataFilterByType = async (
    type: string,
    searchKey: string | number | boolean
  ) => {
    switch (type) {
      case 'home_fundraising':
        return await SearchFundraisingsFilter({
          search_key: searchKey,
        });

      case 'home_upcoming':
        return await SearchUpcomingFilter({
          search_key: searchKey,
        });

      case 'home_categories':
        return await SearchCategoriesFilter({
          search_key: searchKey,
        });

      default:
        return await SearchCoinsFilter({
          search_key: searchKey,
        });
    }
  };

  const _getData = async ({ searchKey }: IOptionAny) => {
    const res: any = await handleDataFilterByType(type, searchKey);
    if (!res) return [];
    
    return res.map((e: ISearchFilter) => ({
      id: type == 'home_fundraising' || type == 'home_upcoming' || type == 'home_all_coins' ? e.key : e.slug,
      name: e.name,
      code: type == 'home_fundraising' || type == 'home_upcoming' || type == 'home_all_coins' ? e.key : e.slug,
      thumb: '',
      isSelected: false,
      symbol: e.symbol,
    }));
  };

  const _renderPlaceholder = () => {
    if (type == 'home_fundraising' || type == 'home_upcoming')
      return 'Filter Project';
    return 'Filter Coins';
  };

  return (
    <div className='core-table__header'>
      <FilterCustom
        placeholder={_renderPlaceholder()}
        renderOption={_renderOption}
        renderTag={_renderTag}
        onChange={onChangeFilterSelect}
        getData={_getData}
        // isSortSelected='alphabet'
      />
      <div className='wrap-btn-filter'>
        {isFilter && (
          <Button
            className='btn-filter !bg-white !text-grey-500'
            onClick={onFilter}
            icon={<IconFilterCoinTab />}
            disabled
          >
            Filters
          </Button>
        )}

        {isCustomize && (
          <Button
            className='btn-filter !bg-white !text-grey-500'
            onClick={onCustomize}
            icon={<IconCustomCointTab />}
            disabled
          >
            Customize
          </Button>
        )}
      </div>
    </div>
  );
};
